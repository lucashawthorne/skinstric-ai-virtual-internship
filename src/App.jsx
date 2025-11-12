import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Result from "./pages/Result/Result";
import Select from "./pages/Select/Select";
import Testing from "./pages/Testing/Testing"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router basename="/skinstric-ai-virtual-internship">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/select" element={<Select />} />
      </Routes>
    </Router>
  );
}

export default App;
