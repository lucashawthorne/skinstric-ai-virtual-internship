// Camera.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScanImage from "../../assets/camera-icon.webp";
import "./Camera.css";

const Camera = () => {
  const [isLoadingCamera, setIsLoadingCamera] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showGreatShot, setShowGreatShot] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  // Simulate camera setup (replace with actual camera setup logic)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingCamera(false);
      // Once ready, navigate to the capture feed
      navigate("/camera/capture");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleTakePicture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/png");
    setCapturedImage(imageDataUrl);

    // Show "Great shot!" text briefly
    setShowGreatShot(true);
    setTimeout(() => setShowGreatShot(false), 1500);
  };

  return (
    <div className="loading__overlay">
      <div className="loading__animation">
        <div className="square loading__square--outer"></div>
        <div className="square loading__square--middle"></div>
        <div className="square loading__square--inner"></div>
        <img src={ScanImage} className="scan__icon" />
      </div>
      <p className="camera__loading--text">Setting Up Camera...</p>

      {/* Loading tips */}
      <div className="camera__tips">
        <p>To get better results, make sure to have</p>
        <ul className="tips__list">
          <li>◇ Neutral Expression</li>
          <li>◇ Frontal Pose</li>
          <li>◇ Adequate Lighting</li>
        </ul>
      </div>
    </div>
  );
};

export default Camera;
