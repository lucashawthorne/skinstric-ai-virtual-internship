import React, { useState, useRef } from "react";
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
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  const navigate = useNavigate();

  // Open camera permission modal
  const handleScanClick = () => setShowScanModal(true);

  // Handle camera access
  const handleAllowCamera = async () => {
    setShowScanModal(false);
    setIsLoadingCamera(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Wait for video metadata to load
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
            .then(() => {
              // Simulate short setup delay for UI
              setTimeout(() => {
                setIsLoadingCamera(false);
                setCameraActive(true);
              }, 1500);
            })
            .catch((err) => {
              console.error("Video play error:", err);
              alert("Camera playback failed.");
              setIsLoadingCamera(false);
            });
        };
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Camera access denied or not available.");
      setIsLoadingCamera(false);
    }
  };

  // Handle image upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreviewSrc(reader.result);
    reader.readAsDataURL(file);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Image analyzed successfully!");
      navigate("/select");
    }, 5000);
  };

  return (
    <div>
      {/* CAMERA SETUP LOADING STATE */}
      {isLoadingCamera && (
        <div className="loading__overlay">
          <div className="loading__animation">
            <div className="square loading__square--outer"></div>
            <div className="square loading__square--middle"></div>
            <div className="square loading__square--inner"></div>
            <img src={ScanImage} className="scan__icon pulse" alt="Scan Icon" />
          </div>

          <p className="camera__loading--text">Setting Up Camera...</p>

          {/* Decreasing gray progress bar */}
          <div className="loading__bar__container">
            <div className="loading__bar"></div>
          </div>

          {/* Tips for selfie */}
          <div className="camera__tips">
            <p>To get better results, make sure to have</p>
            <ul className="tips__list">
              <li>◇ Neutral Expression</li>
              <li>◇ Frontal Pose</li>
              <li>◇ Adequate Lighting</li>
            </ul>
          </div>
        </div>
      )}

      {/* FULLSCREEN CAMERA FEED */}
      {cameraActive && (
        <div className="camera__feed__overlay">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera__video"
          />
          <div className="camera__tips">
            <ul className="tips__list">
              <li>Neutral Expression</li>
              <li>Frontal Pose</li>
              <li>Adequate Lighting</li>
            </ul>
          </div>
          <BackButton />
        </div>
      )}

      {/* IMAGE ANALYSIS LOADING */}
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

      {/* MAIN RESULT PAGE */}
      {!isLoading && !isLoadingCamera && !cameraActive && (
        <>
          <p className="analysis">TO START ANALYSIS</p>
          <div className="result__page">
            {/* LEFT TRIPLET */}
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
                ALLOW A.I. <br />
                TO SCAN YOUR FACE
              </p>
            </div>

            {/* RIGHT TRIPLET */}
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

            {/* CAMERA MODAL */}
            {showScanModal && (
              <div className="modal__overlay">
                <div className="modal__content">
                  <p className="modal__text">
                    ALLOW A.I. TO ACCESS YOUR CAMERA
                  </p>
                  <div className="modal__buttons">
                    <button onClick={() => setShowScanModal(false)}>DENY</button>
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
