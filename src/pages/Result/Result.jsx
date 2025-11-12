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
  const handleAllowCamera = () => {
    setShowScanModal(false);
    // Later: integrate camera access
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Restrict non-image files (safety double-check)
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // Display preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);

    // Begin analysis (show loading)
    setIsLoading(true);

    // Simulate processing delay (e.g., API call)
    setTimeout(() => {
      setIsLoading(false);
      alert("Image analyzed successfully!");
      navigate("/select");
    }, 5000);
  };

  return (
    <div>
      {/* Show loading state */}
      {isLoading ? (
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

          {/* Keep the preview window visible during loading */}
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
      ) : (
        <>
          <p className="analysis">TO START ANALYSIS</p>
          <div className="result__page">
            {/* Left triplet */}
            <div className="triplet">
              <div className="square result__square--outer"></div>
              <div className="square result__square--middle"></div>
              <div className="square result__square--inner"></div>

              <img
                src={ScanImage}
                className="center__image scan__image"
                onClick={handleScanClick}
              />
              <img src={ScanLine} className="scan__line" />
              <p className="scan__text">
                ALLOW A.I. <br />
                TO SCAN YOUR FACE
              </p>
            </div>

            {/* Right triplet */}
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
              />
              <img src={UploadLine} className="upload__line" />
              <p className="upload__text">
                ALLOW A.I. <br />
                ACCESS TO GALLERY
              </p>
            </div>

            {/* Always-visible preview window */}
            <div className="preview__window">
              <p>Preview:</p>
              {previewSrc ? (
                <img src={previewSrc} alt="Preview" />
              ) : (
                <div className="preview__empty">No image uploaded</div>
              )}
            </div>

            {/* Scan modal */}
            {showScanModal && (
              <div className="modal__overlay">
                <div className="modal__content">
                  <p className="modal__text">ALLOW A.I. TO ACCESS YOUR CAMERA</p>
                  <div className="modal__buttons">
                    <button id="deny__text" onClick={() => setShowScanModal(false)}>
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
