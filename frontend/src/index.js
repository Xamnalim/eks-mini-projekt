import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GuestBook from './routes/Guestbook';
import AdminPage from './routes/AdminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestBook />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
