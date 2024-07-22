import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminUploadPage from './components/AdminUploadPage.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/admin/upload" element={<AdminUploadPage />} />
      {/* Другие маршруты */}
    </Routes>
  </Router>
);

export default App;
