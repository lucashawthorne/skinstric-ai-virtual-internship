import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import BackButtonWhite from "../../components/BackButton/BackButtonWhite";
import LoadingDots from "../../components/LoadingDots/LoadingDots";
import { RiCamera3Fill } from "react-icons/ri";
import "./Camera.css";

const CaptureCamera = () => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showGreatShot, setShowGreatShot] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Function to enable the camera
  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            .play()
            .then(() => setCameraActive(true))
            .catch((err) => console.warn("Video autoplay failed:", err));
        };
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Camera access denied or not available.");
    }
  };

  // Enable camera on mount
  useEffect(() => {
    enableCamera();

    // Cleanup camera on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture photo from video feed
  const handleTakePicture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/png");
    setCapturedImage(imageDataUrl);

    // Keep "Great shot!" visible permanently
    setShowGreatShot(true);

    // Stop the camera stream after taking the picture
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  // Handle retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    setShowGreatShot(false);
    enableCamera(); // re-initialize camera when retaking
  };

  // Handle using the photo
  const navigate = useNavigate();

  const handleUsePhoto = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      navigate("/select", { state: { imageBase64: capturedImage } });
    }, 2000);
  };

  return (
    <div className="camera__feed--overlay">
      {/* Video feed */}
      {!capturedImage && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera__video"
          />

          {/* Camera tips overlay */}
          <div className="camera__tips--camera">
            <p>TO GET BETTER RESULTS, MAKE SURE TO HAVE</p>
            <ul className="tips__list">
              <li>◇ NEUTRAL EXPRESSION</li>
              <li>◇ FRONTAL POSE</li>
              <li>◇ ADEQUATE LIGHTING</li>
            </ul>
          </div>

          {/* Take picture button */}
          {cameraActive && (
            <div>
              <p className="take__picture--text">TAKE PICTURE</p>
              <button
                className="take__picture--button"
                onClick={handleTakePicture}
              >
                <RiCamera3Fill size={32} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Captured image preview */}
      {capturedImage && (
        <div className="captured__overlay">
          <img src={capturedImage} alt="Captured" className="captured__image" />

          {/* Great shot text (persistent) */}
          {showGreatShot && <p className="great__shot--text">Great shot!</p>}

          {/* Preview title */}
          <h2 className="preview__title">Preview</h2>

          {/* Retake / Use buttons */}
          <div className="preview__buttons">
            <button className="retake__button" onClick={handleRetake}>
              Retake
            </button>
            <button className="use__photo--button" onClick={handleUsePhoto}>
              {isAnalyzing ? "Uploading..." : "Use This Photo"}
            </button>
            <BackButtonWhite />
          </div>

          {/* Analyzing overlay */}
          {isAnalyzing && (
            <div className="analyzing__overlay">
              <div className="analyzing__box">
                <p className="analyzing__text">Analyzing...</p>
                <LoadingDots />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Always-visible back button */}
      <BackButtonWhite />
    </div>
  );
};

export default CaptureCamera;
