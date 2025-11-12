import React from "react";
import "./Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowUpLeftSquare } from "react-icons/bs";
import { BsArrowUpRightSquare } from "react-icons/bs";
import EnterButton from "../../components/EnterButton/EnterButton";

const Home = () => {
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  return (
    <div>
      <div className="landing">
        <div
          className="left__section"
          style={{
            opacity: hoverRight ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          <div className="square__container">
            <div className="left__square"></div>
            <button
              className="left__button"
              onMouseEnter={() => setHoverLeft(true)}
              onMouseLeave={() => setHoverLeft(false)}
            >
              <BsArrowUpLeftSquare className="left__icon" />
              <span>DISCOVER A.I.</span>
            </button>
          </div>
        </div>
        <h1 className="hero-text">
          <span
            className={`line line1 ${
              hoverLeft ? "slide-right" : hoverRight ? "slide-left" : ""
            }`}
          >
            Sophisticated
          </span>
          <span
            className={`line line2 ${
              hoverLeft
                ? "slide-right-small"
                : hoverRight
                ? "slide-left-small"
                : ""
            }`}
          >
            skincare
          </span>
        </h1>

        <div
          className="right__section"
          style={{
            opacity: hoverLeft ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          <div className="square__container">
            <div className="right__square"></div>
            <Link
              to="/testing"
              className="right__button"
              onMouseEnter={() => setHoverRight(true)}
              onMouseLeave={() => setHoverRight(false)}
            >
              <span>TAKE TEST</span>
              <BsArrowUpRightSquare className="right__icon" />
            </Link>
          </div>
        </div>
      </div>
      <p className="intro">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
      </p>

      {/* Mobile version */}
      <div className="home__mobile">
        <div className="diamond__outer"></div>
        <div className="diamond__inner"></div>

        <h1>Sophisticated <br />skincare</h1>
        <p className="mobile__para">
          Skinstric developed an A.I. that creates a <br />highly-personalized routine
          tailored to <br />what your skin needs.
        </p>
        <EnterButton
          to="/testing"
          label="Enter Experience"
        />
      </div>
    </div>
  );
};

export default Home;
