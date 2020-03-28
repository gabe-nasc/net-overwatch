import React from "react";

import "./styles.css";
import logo from "./eye.png";

function Header() {
  return (
    <header id="main-header">
      <img src={logo} alt="Logo for the project"></img>
      <h3>Net-Overwatch</h3>
    </header>
  );
}

export default Header;
