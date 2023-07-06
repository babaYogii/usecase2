import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme/theme'; 
import { BrowserRouter as BR, Routes,Route } from 'react-router-dom'
import Signup from './Components/User/Signup';
import Signin from './Components/User/Signin';
import ProtectedRoute from './ProtectedRoutes';
import DashboardHome from './Components/Dashboard/DashboardHome';
import './App.css'

function App() {
  return (
    <BR>
      <ThemeProvider theme={theme}>
          <Routes >
            <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<DashboardHome/>} />

            </Route>
              <Route path="/signup" element={<Signup/>} />
              <Route path="/signin" element={<Signin/>} />
          </Routes>
      </ThemeProvider>
    </BR>
  );
}

export default App;