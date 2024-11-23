// File: src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import About from './pages/About';
import VillageAdoption from './components/VillageAdoption'; 
import Entrepreneurship from './components/Entrepreneurship';
import EnvironmentalInitiatives from './components/EnvironmentalInitiatives';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<About />} />

        {/* Key Initiatives Pages */}
        <Route path="/village_adoption" element={<VillageAdoption />} />
        <Route path="/entrepreneurship" element={<Entrepreneurship />} />
        <Route path="/environmental_initiatives" element={<EnvironmentalInitiatives />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
