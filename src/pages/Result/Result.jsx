import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";
import BackButton from "../../components/BackButton/BackButton";
import ScanImage from "../../assets/camera-icon.webp";
import UploadImage from "../../assets/gallery-icon.webp";
import ScanLine from "../../assets/ResScanLine.webp";
import UploadLine from "../../assets/ResGalleryLine.webp";
import LoadingDots from "../../components/LoadingDots/LoadingDots";

const Result = () => {
  const [showScanModal, setShowScanModal] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleScanClick = () => setShowScanModal(true);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setPreviewSrc(base64);
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          }
        );

        const result = await response.json();
        console.log("API response:", result);

        if (!result.success || !result.data) {
          throw new Error(result.message || "Analysis failed");
        }

        navigate("/select", {
          state: {
            imageBase64: base64,
            demographics: result.data,
          },
        });
      } catch (err) {
        console.error("API error:", err);
        alert("There was an error analyzing your image.");
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAllowCamera = () => {
    setShowScanModal(false);
    navigate("/camera"); // Go to loading camera page
  };

  return (
    <div className="result__container">
      {isLoading && (
        <div className="loading__overlay">
          <div className="loading__animation">
            <div className="square loading__square--outer"></div>
            <div className="square loading__square--middle"></div>
            <div className="square loading__square--inner"></div>
            <div className="loading__container">
              <div className="loading__text">Preparing your analysis...</div>
              <LoadingDots />
            </div>
          </div>

          <div className="preview__window">
            <p>Preview:</p>
            {previewSrc ? (
              <img src={previewSrc} alt="Preview" />
            ) : (
              <div className="preview__empty">No image uploaded</div>
            )}
          </div>

          <BackButton />
        </div>
      )}

      {!isLoading && (
        <>
          <p className="analysis">TO START ANALYSIS</p>

          <div className="result__page">
            {/* Left triplet (Scan) */}
            <div className="triplet">
              <div className="square result__square--outer"></div>
              <div className="square result__square--middle"></div>
              <div className="square result__square--inner"></div>

              <img
                src={ScanImage}
                className="center__image scan__image"
                onClick={handleScanClick}
                alt="Scan trigger"
              />
              <img src={ScanLine} className="scan__line" alt="" />
              <p className="scan__text">
                ALLOW A.I. <br /> TO SCAN YOUR FACE
              </p>
            </div>

            {/* Right triplet (Upload) */}
            <div className="triplet">
              <div className="square result__square--outer"></div>
              <div className="square result__square--middle"></div>
              <div className="square result__square--inner"></div>

              <input
                type="file"
                accept="image/*"
                id="uploadInput"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
              <img
                src={UploadImage}
                className="center__image upload__image"
                onClick={() => document.getElementById("uploadInput").click()}
                alt="Upload trigger"
              />
              <img src={UploadLine} className="upload__line" alt="" />
              <p className="upload__text">
                ALLOW A.I. <br /> ACCESS TO GALLERY
              </p>
            </div>

            {/* Always-visible preview */}
            <div className="preview__window">
              <p>Preview:</p>
              {previewSrc ? (
                <img src={previewSrc} alt="Preview" />
              ) : (
                <div className="preview__empty">No image uploaded</div>
              )}
            </div>

            {/* Camera modal */}
            {showScanModal && (
              <div className="modal__overlay">
                <div className="modal__content">
                  <p className="modal__text">
                    ALLOW A.I. TO ACCESS YOUR CAMERA
                  </p>
                  <div className="modal__buttons">
                    <button onClick={() => setShowScanModal(false)}>
                      DENY
                    </button>
                    <button onClick={handleAllowCamera}>ALLOW</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <BackButton />
        </>
      )}
    </div>
  );
};

export default Result;
