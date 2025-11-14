import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaDiamond } from "react-icons/fa6";
import { GoDiamond } from "react-icons/go";
import BackButton from "../../components/BackButton/BackButton";
import ForwardButton from "../../components/ForwardButton/ForwardButton";
import PieChart from "../../components/PieChart/PieChart";
import "./Summary.css";

const Summary = () => {
  const location = useLocation();
  const { imageBase64, demographics } = location.state || {};
  
  const [apiData, setApiData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("RACE");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [percentages, setPercentages] = useState({
    race: {},
    age: {},
    gender: {},
  });

  const [sidebarSelections, setSidebarSelections] = useState({
    RACE: "",
    AGE: "",
    SEX: "",
  });

  const tabKeyMap = {
    RACE: "race",
    AGE: "age",
    SEX: "gender",
  };

  const capitalize = (str) =>
    str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const toUpper = (str) => str.toUpperCase();

  const convertToPercentages = (obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [key, Math.round(val * 100)])
    );

  useEffect(() => {
    if (!demographics) return;

    const racePct = convertToPercentages(demographics.race);
    const agePct = convertToPercentages(demographics.age);
    const genderPct = convertToPercentages(demographics.gender);

    setPercentages({ race: racePct, age: agePct, gender: genderPct });

    // Default selections
    const topRace = Object.keys(racePct).reduce((a, b) =>
      racePct[a] > racePct[b] ? a : b
    );
    const topAge = Object.keys(agePct).reduce((a, b) =>
      agePct[a] > agePct[b] ? a : b
    );
    const topGender = Object.keys(genderPct).reduce((a, b) =>
      genderPct[a] > genderPct[b] ? a : b
    );

    setSelectedAttribute(topRace);
    setSidebarSelections({
      RACE: topRace,
      AGE: topAge,
      SEX: topGender,
    });

    setApiData(demographics);
  }, [demographics]);

  if (!imageBase64) return <p>No image provided.</p>;
  if (!demographics) return <p>No prediction data found.</p>;

  const currentTabKey = tabKeyMap[selectedTab];
  const tabData = percentages[currentTabKey] || {};

  // Sorted options for right-hand list
  const sortedOptions = Object.entries(tabData)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key);

  const percentageOfSelected = tabData[selectedAttribute] || 0;

  return (
    <div>
      <div className="demographics__section">
        <div className="demographics__text">
          <h3 className="summary__analysis">A.I. ANALYSIS</h3>
          <h1 className="summary__title">DEMOGRAPHICS</h1>
          <p className="predicted__text">PREDICTED RACE & AGE</p>
        </div>

        <div className="demographics__grid">
          {/* LEFT: Tabs */}
          <div className="demographics__tabs">
            {["RACE", "AGE", "SEX"].map((tab) => {
              const keyForData = tabKeyMap[tab];
              const topValue = sidebarSelections[tab];
              return (
                <div
                  key={tab}
                  className={`tab ${selectedTab === tab ? "active" : ""}`}
                  onClick={() => {
                    setSelectedTab(tab);
                    setSelectedAttribute(sidebarSelections[tab]);
                  }}
                >
                  <p>
                    {tab === "SEX" ? toUpper(topValue) : capitalize(topValue)}
                  </p>
                  <span>{tab}</span>
                </div>
              );
            })}
          </div>

          {/* MIDDLE: Pie chart */}
          <div className="demographics__pie">
            <h1 className="criteria">
              {selectedTab === "SEX"
                ? toUpper(selectedAttribute)
                : capitalize(selectedAttribute)}
            </h1>
            <PieChart percentage={percentageOfSelected} />
          </div>

          {/* RIGHT: List of options */}
          <div className="demographics__list">
            {/* Header row */}
            <div
              className="demographics__list--header"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h4>{selectedTab === "SEX" ? "SEX" : selectedTab}</h4>
              <h4>A.I. CONFIDENCE</h4>
            </div>

            {/* Options */}
            {sortedOptions.map((option) => {
              const isSelected = option === selectedAttribute;
              return (
                <div
                  key={option}
                  className={`demographics__list--item ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedAttribute(option);
                    setSidebarSelections((prev) => ({
                      ...prev,
                      [selectedTab]: option,
                    }));
                  }}
                >
                  <div className="demographics__list--text">
                    <span className="diamond-icon">
                      {isSelected ? <GoDiamond /> : <FaDiamond />}
                    </span>
                    {selectedTab === "SEX"
                      ? toUpper(option)
                      : capitalize(option)}
                  </div>
                  <span>{tabData[option]}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="summary__button--container">
        <div className="bottom__button--back">
          <BackButton to="/select" label="BACK" />
        </div>
        <div className="bottom__button--home">
          <ForwardButton to="/" label="HOME" />
        </div>
      </div>
    </div>
  );
};

export default Summary;
