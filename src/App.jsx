import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/wedding/Layout";
import Home from "./pages/Home";
import Proposal from "./pages/Proposal";
import Story from "./pages/Story";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/story" element={<Story />} />
        </Route>
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
            <div className="text-center">
              <h1 className="font-serif text-4xl font-normal mb-4" style={{ color: "#3D3832" }}>404</h1>
              <p className="font-sans text-sm" style={{ color: "#8B7355" }}>העמוד לא נמצא</p>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}
