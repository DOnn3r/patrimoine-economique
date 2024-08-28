import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; // Import Link
import Possessions from './Possession';
import CreatePossession from './CreatePossession';
import Patrimoine from './Patrimoine';
import MyNavbar from './Navbar';

function App() {
  return (
    <div>
    <MyNavbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Possessions />} />
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/create" element={<CreatePossession />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;