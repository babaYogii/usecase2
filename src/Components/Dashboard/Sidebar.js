import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import {Menu,Inbox,Mail, RepeatOnSharp} from '@mui/icons-material';
import {  AppBar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { getUpcomingBirthdays } from '../../api/birthdayApi';


function Sidebar({ setBirthday, birthday }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUpcomingBirthdays('7days');
        // setBirthday(response.data);
        setBirthday(response.data);
        // const currentDate = new Date();

        birthday.sort((a, b) => {
          const dateA = new Date(a.dob);
          const dateB = new Date(b.dob);
          const currentDate = new Date();
        
          // Set the year of both dates to the current year
          dateA.setFullYear(currentDate.getFullYear());
          dateB.setFullYear(currentDate.getFullYear());
        
          const timeDiffA = Math.abs(dateA.getTime() - currentDate.getTime());
          const timeDiffB = Math.abs(dateB.getTime() - currentDate.getTime());
        
          return timeDiffA - timeDiffB;
        });
        // console.log(birthday);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);





  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handelClick=async(urlString)=>{
    const response =await getUpcomingBirthdays(`${urlString}`);
    setBirthday(response.data);
    // console.log(response);
  }
  const menuItems=[
    { text: '7days', icon: <Inbox />,urlString:'7days' },
    { text: '14days', icon: <Mail />,urlString:'14days' },
    { text: '1month', icon: <Menu />,urlString:'1month' },
  ]

  const drawer = (
    <div >
     <Toolbar>
        <Typography variant="h6">WishMaster</Typography>
      </Toolbar>
    <Divider />
    <List>
      {menuItems.map((menuItem, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => handelClick(menuItem.urlString)}>
            <ListItemIcon  className='icon-primary'>
            {/* {menuItem.icon} */}
            </ListItemIcon>
            <ListItemText primary={menuItem.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((menuItem, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={()=>{getUpcomingBirthdays(`${menuItem.urlString}`)}}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={menuItem.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
  );

  return (
    <div >
      <AppBar>

      <Toolbar>
        {isSmallScreen && (
          <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
        )}
      </Toolbar>
        </AppBar>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          open
          sx={{
            width: 270,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 270 },
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={open}
          sx={{ width: 270, // Adjust the width as needed
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 220, // Adjust the width as needed
          },}}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
     
    </div>
  );
}

export default Sidebar;
