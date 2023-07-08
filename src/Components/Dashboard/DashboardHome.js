import React, { useState } from 'react';


import Sidebar from './Sidebar';
import MainComponent from './MainComponent';
import { Box } from '@mui/material';

function Dashboard() {
  const [birthday,setBirthday]=useState([]);
  const [anniversary,setAnniversary]=useState([])
  console.log(birthday);
  
  return (
    <Box sx={{display:'flex'}}>
      <Sidebar flex={1} setBirthday={setBirthday} birthday={birthday} anniversary={anniversary} setAnniversary={setAnniversary}/>
      <MainComponent flex={4} setBirthday={setBirthday} birthday={birthday} anniversary={anniversary} setAnniversary={setAnniversary} />
    </Box>
  );
}

export default Dashboard;
