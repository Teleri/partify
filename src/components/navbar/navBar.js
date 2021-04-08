import React from "react";
import { auth } from "../../services/firebase";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <div>
            {auth().currentUser ? (
              <div>
                <Link to="/chat">Chat</Link>
                <button onClick={() => auth().signOut()}>Logout</button>
              </div>
            ) : (
              <div>
                <Link to="/login">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>
      </Router>
    </header>
  );
}

export default Navbar;
