import NavBar from "./components/NavBar/NavBar";
import Camera from "./pages/Camera/Camera";
import CaptureCamera from "./pages/Camera/CaptureCamera";
import Home from "./pages/Home/Home";
import Result from "./pages/Result/Result";
import Select from "./pages/Select/Select";
import Testing from "./pages/Testing/Testing";
import Summary from "./pages/Summary/Summary"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router basename="/skinstric-ai-virtual-internship">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/camera/capture" element={<CaptureCamera />} />
        <Route path="/select" element={<Select />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
