import React from "react";
import { auth } from "../../services/firebase";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "../../styles/shared/navbar.scss";

function Navbar() {
  return (
    <header>
      <Router>
        <nav>
          <div className="navbar-container">
            <div className="nav-links">
              <Link to="/">Home</Link>
            </div>
            <div>
              {auth().currentUser ? (
                <div className="logged-in-links">
                  <div className="nav-links">
                    <Link to="/chat">Chat</Link>
                  </div>
                  <div className="nav-links">
                    <button onClick={() => auth().signOut()}>Logout</button>
                  </div>
                </div>
              ) : (
                <div>
                  <Link to="/login">Sign In</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </Router>
    </header>
  );
}

export default Navbar;
