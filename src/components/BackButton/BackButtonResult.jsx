import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpLeftSquare } from "react-icons/bs";
import "./BackButton.css";

const BackButtonResult = () => {
  return (
    <Link to={"/result"} className="back__button">
      <BsArrowUpLeftSquare className="back__icon" />
      <span className="back__text">BACK</span>
    </Link>
  );
};

export default BackButtonResult;