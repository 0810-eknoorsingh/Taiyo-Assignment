import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ContactsPage from './pages/ContactsPage';
import ChartsAndMapsPage from './pages/ChartsAndMapsPage';

const App: React.FC = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-white font-bold">
            Contact Management App
          </Link>
          <div>
            <Link to="/" className="text-white hover:text-gray-400 mr-4">
              Contacts
            </Link>
            <Link to="/charts-and-maps" className="text-white hover:text-gray-400">
              Charts and Maps
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="/charts-and-maps" element={<ChartsAndMapsPage />} />
      </Routes>
    </div>
  );
};

export default App;