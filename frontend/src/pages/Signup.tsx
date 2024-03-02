import Quote from "../components/Quote"
import Form from "../components/Form"

export default function Signup() {
  return <div>
    <div className="grid grid-cols-2">
      <div>
        <Form />
      </div>
      <div className="invisible lg:visible">
        <Quote />
      </div>
    </div>

  </div>
}
