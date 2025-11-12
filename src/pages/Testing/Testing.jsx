import React, { useState } from "react";
import "./testing.css";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import ProceedButton from "../../components/ProceedButton/ProceedButton";
import LoadingDots from "../../components/LoadingDots/LoadingDots";

const Testing = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const isValidString = (input) => /^[A-Za-z\s]+$/.test(input.trim());

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (step === 1) {
        if (isValidString(name)) {
          setError("");
          setStep(2);
        } else {
          setError(
            "Please enter a valid name without numbers or special characters"
          );
        }
      } else if (step === 2) {
        if (isValidString(location)) {
          setError("");
          submitData();
        } else {
          setError(
            "Please enter a valid city name without numbers or special characters"
          );
        }
      }
    }
  };

  const submitData = async () => {
    setStatus("loading");
    const userData = { name, location };
    localStorage.setItem("userData", JSON.stringify(userData));

    try {
      const res = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      const data = await res.json();
      console.log({
        SUCCESS: `Added ${name} from ${location}`,
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="testing__page">
      {/* Top label */}
      <p className="analysis">TO START ANALYSIS</p>

      {/* Rotating squares */}
      <div className="rotating__squares">
        <div className="square testing__square--outer"></div>
        <div className="square testing__square--middle"></div>
        <div className="square testing__square--inner"></div>

        {/* Form / Input container */}
        <div className="form__container">
          {status === "idle" && (
            <>
              <p className="form__prompt">CLICK TO TYPE</p>

              {step === 1 && (
                <input
                  type="text"
                  placeholder="Introduce Yourself"
                  className="form__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              )}

              {step === 2 && (
                <input
                  type="text"
                  placeholder="Your City Name"
                  className="form__input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              )}

              {error && <p className="error__message">{error}</p>}
            </>
          )}

          {status === "loading" && (
            <>
              <p className="loading__text">Processing submission...</p>
              <LoadingDots />
            </>
          )}

          {status === "success" && (
            <div className="success__message">
              <h2>Thank you!</h2>
              <h3>Proceed to the next step</h3>
            </div>
          )}
        </div>
      </div>

      {/* Buttons row: BackButton always visible, ProceedButton only on success */}
      <div className="buttons__container">
        <BackButton />
        {status === "success" && <ProceedButton />}
      </div>
    </div>
  );
};

export default Testing;
