import React from 'react';
import Navbar from './components/navigation/Navbar';
import Found from './pages/Fund';
import {Route, Routes} from 'react-router-dom';
import BestFunds from './pages/BestFunds';

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route index path="/" element={<BestFunds />} />
        <Route path="/fund/:id" element={<Found />} />
      </Routes>
    </div>
  );
};

export default App;
