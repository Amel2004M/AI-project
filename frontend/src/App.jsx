import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import VerifyCode from './pages/VerifyCode.jsx';
import ResettingPassword from './pages/ResettingPassword.jsx';

const router = createBrowserRouter([
  { path: "/",                   element: <SignUp /> },
  { path: "/signin",             element: <SignIn /> },
  { path: "/reset-password",     element: <ResetPassword /> },
  { path: "/verify-code",        element: <VerifyCode /> },
  { path: "/resetting-password", element: <ResettingPassword /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;