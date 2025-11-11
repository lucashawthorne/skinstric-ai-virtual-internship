import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRightSquare } from "react-icons/bs";
import "./ProceedButton.css";

const ProceedButton = () => {
  return (
    <Link to="/result" className="proceed__button">
      <span className="proceed__text">PROCEED</span>
      <BsArrowUpRightSquare className="proceed__icon" />
    </Link>
  );
};

export default ProceedButton;
