import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Contact Information</h3>

      <div className="space-y-2">
        <div className="flex items-center">
          <Mail className="h-4 w-4 text-[#2973B2] mr-2" />
          <span>contact@policeadvisor.com</span>
        </div>

        <div className="flex items-center">
          <Phone className="h-4 w-4 text-[#2973B2] mr-2" />
          <span>+1 (555) 123-4567</span>
        </div>

        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-[#2973B2] mr-2" />
          <span>123 Security Ave, Suite 500, Metropolis, NY 10001</span>
        </div>
      </div>

      <div className="pt-2">
        <p>For emergency situations, please contact your local emergency services directly by dialing 911.</p>
      </div>

      <div className="pt-2">
        <p>Office Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</p>
      </div>
    </div>
  )
}
