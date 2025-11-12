import React from "react";
import { BsArrowUpLeftSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./BackButtonWhite.css"

const BackButtonWhite = () => {
  return (
    <Link to={"/result"} className="back__button--white">
      <BsArrowUpLeftSquare className="back__icon--white" />
      <span className="back__text--white">BACK</span>
    </Link>
  );
};

export default BackButtonWhite;
