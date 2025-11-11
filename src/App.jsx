import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Result from "./pages/Result/Result";
import Testing from "./pages/Testing/Testing"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
