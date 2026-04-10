import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import VerifyCode from './pages/VerifyCode.jsx';
import ResettingPassword from './pages/ResettingPassword.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/resetting-password" element={<ResettingPassword />} />
    </Routes>
  );
};

export default App;