import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Components/Home/Home';
import Data from './Components/Data/Data';
import Confirmation from './Components/Confirmation/Confirmation';
import Verification from './Components/Verification/Verification';
import Payment from './Components/Payment/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='datos' element={<Data />} />
        <Route path='confirmacion' element={<Confirmation />} />
        <Route path='verificacion' element={<Verification />} />
        <Route path='pago' element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;