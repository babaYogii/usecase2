import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme/theme'; 
import { BrowserRouter as BR, Routes,Route } from 'react-router-dom'
import Signup from './Components/User/Signup';
import Signin from './Components/User/Signin';
import ProtectedRoute from './ProtectedRoutes';
import DashboardHome from './Components/Dashboard/DashboardHome';
import './App.css'
import UploadFile from './Components/AdminFunctionality/UploadFile';
import Landingpage from './Components/Landingpage';
import AddAdmin from './Components/AdminFunctionality/AddAdmin';
import AllEmployee from './Components/Allemployee/AllEmployee';

function App() {
  console.log("Check rendering")
  return (
    <BR>
      <ThemeProvider theme={theme}>
          <Routes >
            <Route element={<ProtectedRoute/>}>
              <Route path="/dashboard" element={<DashboardHome/>} />
              <Route path="/upload" element={<UploadFile/>}/>
              <Route path="/" element={<Landingpage/>}/>
              <Route path="/addAdmin" element={<AddAdmin/>}/>
              <Route path="/getAllEmployee" element={<AllEmployee/>}/>
            </Route>
              <Route path="/signup" element={<Signup/>} />
              <Route path="/signin" element={<Signin/>} />
          </Routes>
      </ThemeProvider>
    </BR>
  );
}

export default App;