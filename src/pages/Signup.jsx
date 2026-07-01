import signupImg from "../assets/Images/signup.webp"
import Template from "../components/Core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions learning to code"
      description1="Build skills for today, tomorrow, and beyond."
      description2={
        <span>
          Education to future-proof your career. <br />
          <strong className="text-yellow-100 block mt-2 text-xs bg-yellow-900/30 p-2 rounded border border-yellow-700/50">
            Note: Live API is hosted on Render Free Tier. Initial sign-up request may take 30-40 seconds to spin up the container.
          </strong>
        </span>
      }
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
