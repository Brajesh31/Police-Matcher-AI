const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const dbName = "police";
const collectionName = "officers";

const logger = {
  info: (msg) => console.log(msg),
  error: (msg) => console.error(msg),
};

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

let client;
let collection;

async function connectToDatabase() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection(collectionName);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
}

async function getOfficers() {
  try {
    return await collection.find({}).toArray();
  } catch (error) {
    logger.error(`Error fetching officers: ${error}`);
    return [];
  }
}

function formatOfficerData(officers) {
  return officers
    .map((officer, i) => {
      return `Officer ${i + 1}:
Name: ${officer.name}
Age: ${officer.age}
Description: ${officer.short_description}
Skills: ${officer.skills}
Experience: ${officer.experience} years
Gender: ${officer.gender}
`;
    })
    .join("\n");
}

function generateAIPrompt(caseDescription, officersText) {
  return `
Task: Based on the case description and available officers, decide:
1. How many officers are required (number).
2. Select the best-suited officers (names only).
3. Provide a short justification for each selected officer.

Rules:
- Do NOT mention officers not in the list.
- Only suggest the number of officers truly needed.
- Avoid listing unnecessary officers.
- Format the response as:

Required Officers: <number>

Selected Officers:
1. <Officer Name> - <Short reason>
2. <Officer Name> - <Short reason>
...

Case Description:
${caseDescription}

Available Officers:
${officersText}
`;
}

async function findBestOfficers(caseDescription) {
  const officers = await getOfficers();
  if (!officers || officers.length === 0) {
    throw new Error("No officers found in the database.");
  }

  const officersText = formatOfficerData(officers);
  const prompt = generateAIPrompt(caseDescription, officersText);

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    if (!responseText.includes("Required Officers:")) {
      throw new Error("Invalid AI format: missing 'Required Officers'");
    }

    const numLine = responseText.match(/Required Officers:\s*(\d+)/i);
    const numberOfOfficers = numLine ? parseInt(numLine[1]) : 1;

    const selections = [];
    const lines = responseText.split("\n");
    for (const line of lines) {
      const match = line.match(/^\d+\.\s*(.*?)\s*-\s*(.*)$/);
      if (match) {
        const name = match[1].trim();
        const reason = match[2].trim();

        const officerDoc = await collection.findOne({
          name: { $regex: new RegExp(name, "i") },
        });

        if (officerDoc) {
          selections.push({
            name: officerDoc.name,
            age: officerDoc.age,
            short_description: officerDoc.short_description,
            skills: officerDoc.skills,
            experience: officerDoc.experience,
            gender: officerDoc.gender,
            reason,
          });
        }
      }
    }

    return {
      requiredOfficers: selections.length,
      selectedOfficers: selections,
    };
  } catch (error) {
    throw new Error(`Error processing AI response: ${error.message}`);
  }
}

app.get("/", (_req, res) => {
  res.json({
    message: "Police Officer Assignment AI",
    usage:
      "POST /match-officer with { description: '...' } to get officer recommendations.",
  });
});

app.post("/match-officer", async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim().length < 20) {
      return res.status(400).json({
        error:
          "Please provide a detailed case description (min 20 characters).",
      });
    }

    console.log("\x1b[33m%s\x1b[0m", "FINDING BEST OFFICERS...");
    console.log("\x1b[32m%s\x1b[0m", "FINDING REQUIRED TEAM SIZE...");
    const result = await findBestOfficers(description);
    console.log("\x1b[36m%s\x1b[0m", "PROCESS COMPLETED!");
    console.log("\x1b[35m%s\x1b[0m", "HAVE A NICE DAY!");
    res.json(result);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  logger.error(`Failed to start server: ${err}`);
  process.exit(1);
});
