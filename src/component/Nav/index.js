import React from "react";
import { useNavigate } from "react-router";


const Nav = () => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate(`/`);
    localStorage.clear();
    console.log("log out");
  };
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <img src="/Newss.jpg" className="nav-logo" />  
          <ul className="nav-menu">
            {/* <li className="nav-item">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => navigate(`/Profile`)}
              >
                my profile{" "}
              </button>
            </li> */}
            <li className="nav-item">
              <button className="btn btn-primary" type="submit" onClick={logOut}>
                Log out
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Nav;