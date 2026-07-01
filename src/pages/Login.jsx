import loginImg from "../assets/Images/login.webp"
import Navbar from "../components/Common/Navbar"
import Template from "../components/Core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2={
        <span>
          Education to future-proof your career. <br />
          <strong className="text-yellow-100 block mt-2 text-xs bg-yellow-900/30 p-2 rounded border border-yellow-700/50">
            Note: Live API is hosted on Render Free Tier. Initial sign-in request may take 30-40 seconds to spin up the container.
          </strong>
        </span>
      }
      image={loginImg}
      formType="login"
    />
  )
}
export default Login
