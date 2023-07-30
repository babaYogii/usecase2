import React, { useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Sidebar from './Sidebar';
import MainComponent from './MainComponent';
import { Box, IconButton, } from '@mui/material';
import AddAdmin from '../AdminFunctionality/AddAdmin';
import UploadFile from '../AdminFunctionality/UploadFile';
import { useNavigate } from 'react-router-dom';
import AllEmployee from '../Allemployee/AllEmployee';
import image from '../../Orange-Yellow.png'


function Dashboard() {
  const navigate = useNavigate();
  const [allemp, setAllemp] = useState();
  const [birthday, setBirthday] = useState([]);
  const [anniversary, setAnniversary] = useState([])
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const handleMenuItemSelect = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const handelLogout = () => {
    localStorage.clear();
    navigate('/signin');

  }


  const renderDashboardComponent = () => {
    switch (selectedMenuItem) {
      case 'Addadmin':
        return <AddAdmin />;
      case 'AddFile':
        return <UploadFile />;
      case 'maincomponent':
        return <MainComponent flex={4} setBirthday={setBirthday} birthday={birthday} anniversary={anniversary} setAnniversary={setAnniversary} />;
        ;
      case 'AllEmployee':
        return <AllEmployee allemp={allemp} setAllemp={setAllemp} />;
        ;
      // Add cases for other menu items and corresponding components
      default:
        return null
    }
  };

  return (
    <Box sx={{
      display: 'flex', }}>
      <Box sx={{
        height: '20px', padding: 2,
      }}>
        <IconButton sx={{ position: 'absolute', right: 30, top: 25, zIndex: 100 }} onClick={handelLogout}>
          <LogoutIcon sx={{ mx: 1 }} />Logout
        </IconButton>

      </Box>
      <Sidebar flex={1} setBirthday={setBirthday} birthday={birthday} anniversary={anniversary} onMenuItemSelect={handleMenuItemSelect} setAnniversary={setAnniversary} />
      <Box style={{backgroundImage:`${image}`}}>{renderDashboardComponent()}</Box>
    </Box>
  );
}

export default Dashboard;
