import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';
import ResetPassword from './ResetPassword.jsx';
import VerifyCode from './VerifyCode.jsx';
import ResettingPassword from './ResettingPassword.jsx';

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