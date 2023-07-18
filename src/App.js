import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme/theme';
import { BrowserRouter as BR, Routes, Route } from 'react-router-dom'
import Signup from './Components/User/Signup';
import Signin from './Components/User/Signin';
import ProtectedRoute from './ProtectedRoutes';
import DashboardHome from './Components/Dashboard/DashboardHome';
import './App.css'
import Landingpage from './Components/Landingpage';
import ForgetPassword from './Components/User/ForgetPassword';
import ResetPassword from './Components/User/ResetPassword';
import ErrorPage from './Components/ErrorPage';

function App() {
  // console.log("Check rendering")
  return (
    <BR>
      <ThemeProvider theme={theme}>
        <Routes >
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardHome />} />

            <Route path="/" element={<Landingpage />} />

          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgetPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ThemeProvider>
    </BR>
  );
}

export default App;