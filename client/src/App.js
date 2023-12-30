import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import File from "./pages/File";


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" Component={File} />
      </Routes>
    </Router>

  );
};

export default App;
