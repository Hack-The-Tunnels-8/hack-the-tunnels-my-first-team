import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../context";
import "./Navbar.style.scss";
import logo from "./images/logo.png";

function Navbar() {
  const { loggedIn, logout } = useAccountContext();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" className="navbar_logo"/>
      </Link>
      <div className="navbar__account">
        {loggedIn() === false ? (
          <>
            <button onClick={() => navigate("/sign-up")} className="sign_up">Sign Up</button>
            <button onClick={() => navigate("/login")} className="login" >Login</button>
          </>
        ) : (
          <button onClick={() => logout()}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
