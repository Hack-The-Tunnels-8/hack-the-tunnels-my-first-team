import { Page } from "../../components";
import "./SignUp.style.scss";

function SignUp() {
  return (
    <Page>
      <div className="signup-page">
        <h1>Sign Up</h1>
        <p>Email: </p>
        <input
          type="email"

        />
        <p>Password: </p>
        <input
          type="password"
        />
      </div>
    </Page>
  );
}

export default SignUp;
