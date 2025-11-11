import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Testing from "./pages/Testing/Testing"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </Router>
  );
}

export default App;
