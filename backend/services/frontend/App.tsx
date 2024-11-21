import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RideEstimatePage from './pages/RideEstimatePage';
import RideOptionsPage from './pages/RideOptionsPage';
import RideHistoryPage from './pages/RideHistoryPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RideEstimatePage />} />
        <Route path="/options" element={<RideOptionsPage estimateData={{}} />} />
        <Route path="/history" element={<RideHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;