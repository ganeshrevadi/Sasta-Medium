import Quote from "../components/Quote"
import Form from "../components/Form"

export default function Signup() {
  return <div>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Form type="signup" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>

  </div>
}
