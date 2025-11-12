import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRightSquare } from "react-icons/bs";
import "./SummaryButton.css";

const SummaryButton = () => {
  return (
    <Link to={"/summary"} className="summary__button">
      <span className="summary__text">SUMMARY</span>
      <BsArrowUpRightSquare className="summary__icon" />
    </Link>
  );
};

export default SummaryButton;