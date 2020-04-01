import React from "react";

import "./styles.css";
import logo from "./eye.png";
import reload from "./reload.svg";

function Header() {
  return (
    <header id="main-header">
      <img src={logo} alt="Logo for the project"></img>
      <h3>Net-Overwatch</h3>
      <input
        type="image"
        alt="Reload page button"
        src={reload}
        onClick={() => window.location.reload()}
      />
    </header>
  );
}

export default Header;
