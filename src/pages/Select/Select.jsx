import React from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./Select.css";
import { useNavigate } from "react-router-dom";
import ForwardButton from "../../components/ForwardButton/ForwardButton";

const Select = () => {
  const navigate = useNavigate();
  const handleDemographicsClick = () => {
    navigate("/summary");
  };

  return (
    <div className="select__page">
      <div className="analysis__text">
        <h2 className="analysis__title">A.I. ANALYSIS</h2>
        <p className="analysis__para">
          A.I. HAS ESTIMATE THE FOLLOWING.
          <br /> FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </div>
      <div className="select__container">
        {/* Top button (active) */}
        <button
          className="diamond__button diamond__top"
          onClick={handleDemographicsClick}
        >
          <span className="diamond__label">DEMOGRAPHICS</span>
        </button>

        {/* Left button */}
        <button className="diamond__button diamond__left" disabled>
          <span className="diamond__label">
            COSMETIC
            <br /> CONCERNS
          </span>
        </button>

        {/* Right button */}
        <button className="diamond__button diamond__right" disabled>
          <span className="diamond__label">SKIN TYPE DETAILS</span>
        </button>

        {/* Bottom button */}
        <button className="diamond__button diamond__bottom" disabled>
          <span className="diamond__label">WEATHER</span>
        </button>
        <div className="dotted__diamond dotted__diamond--small"></div>
        <div className="dotted__diamond dotted__diamond--medium"></div>
        <div className="dotted__diamond dotted__diamond--large"></div>
      </div>
      <BackButton to="/result" label="BACK" />
      <ForwardButton to="/summary" label="SUMMARY" />
    </div>
  );
};

export default Select;
