import React from "react";
import "./NavBar.css"

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="left__nav">
        <a href="/" className="nav__text">SKINSTRIC</a>
        <p className="intro__text nav__text">[ INTRO ]</p>
      </div>
      <div className="right__nav">
         <button className="nav__button nav__button--text" >ENTER CODE</button>
      </div>
    </div>
  );
};

export default NavBar;
