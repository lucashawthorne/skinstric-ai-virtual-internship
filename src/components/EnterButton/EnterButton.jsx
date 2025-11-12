import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRightSquare } from "react-icons/bs";
import "./EnterButton.css";

const EnterButton = ({ to = "/", label = "" }) => {
  return (
    <Link to={to} className="enter__button">
      <span className="enter__text">{label}</span>
      <BsArrowUpRightSquare className="enter__icon" />
    </Link>
  );
};

export default EnterButton;
