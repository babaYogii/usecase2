import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CakeIcon from '@mui/icons-material/Cake';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
// import { makeStyles } from '@mui/styles';
import { Menu, Inbox, Mail } from '@mui/icons-material';
import { AppBar,  Box,  Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { getUpcomingAnniversary, getUpcomingBirthdays } from '../../api/eventApi';
import { useNavigate } from 'react-router-dom';
import logo from '../../ExcelWishmaster.png';

// const useStyles = makeStyles((theme) => ({
//   toolbar: {
//     boxShadow: theme.shadows[3], // Adjust the shadow value as needed
//    display:'flex',
//    alignItems:'center',
//    justifyContent:'center'
//   },

// }));



function Sidebar({ setBirthday, birthday, anniversary, setAnniversary,onMenuItemSelect }) {

  // const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [role, setRole] = React.useState('');
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = React.useState(null); // State to keep track of the selected item
  const [selectedItemforAnniversary, setSelectedItemforAnniversary] = React.useState(null); // State to keep track of the selected item

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onMenuItemSelect("maincomponent")
  };

  const handleItemClickforAnniversary = (item) => {
    setSelectedItemforAnniversary(item);
    onMenuItemSelect("maincomponent")

  };

  const fetchBirthDate = async () => {
    try {
      const response = await getUpcomingBirthdays('1days');
      onMenuItemSelect("maincomponent")
      setBirthday(response.data);

    }
    catch (error) {
      console.log(error);
    }
  };

  const fetchAniversaryDate = async () => {
    try {
      const response = await getUpcomingAnniversary('days');
      setAnniversary(response.data);
      onMenuItemSelect("maincomponent")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBirthDate();
    fetchAniversaryDate();

    let roleFromLocalStorage = localStorage.getItem('role');
    if (roleFromLocalStorage != null) {
      const trimmedRole = roleFromLocalStorage.replace(/^"(.*)"$/, '$1');
      setRole(trimmedRole.toUpperCase());
    }
    // eslint-disable-next-line
  }, [navigate]);





  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handelBirthClick = async (urlString) => {
    const response = await getUpcomingBirthdays(`${urlString}`);
    setBirthday(response.data);
    // console.log(response);
  }
  const handelAnniversaryClick = async (urlString) => {
    const response = await getUpcomingAnniversary(`${urlString}`);
    setAnniversary(response.data);
    // console.log(response);
  }

  const menuItems = [
    { text: '7 days', icon: <Inbox />, urlString: '7days' },
    { text: '14 days', icon: <Mail />, urlString: '14days' },
    { text: '1 month', icon: <Menu />, urlString: '1month' },
    { text: '6 months', icon: <Menu />, urlString: '6months' },
  ]

  const drawer = (
    <div >
      <Toolbar sx={{display:'flex',alignItems:'center',justifyContent:'center',boxShadow:3}}>
        <img src={logo} onClick={()=>{navigate('/')}} alt='WishMaster' style={{ width: 80, marginLeft: '-35px', marginRight: '-0px',cursor:'pointer' }} />
      </Toolbar>
      <Divider />

      <List >
        <Typography align='center' gutterBottom sx={{ mt: 2 }}><CakeIcon /> Birthday's </Typography>
        {menuItems.map((menuItem, index) => (
          <ListItem key={index} disablePadding
          // selected={selectedItem === menuItem.text}
          >
            <ListItemButton
              sx={{
                backgroundColor: selectedItem === menuItem.text ? '#F9E0BB' : 'inherit',

              }}
              disableRipple
              onClick={() => { handelBirthClick(menuItem.urlString); handleItemClick(menuItem.text) }}>
              <ListItemText secondary={menuItem.text} color="text.primary" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>


      <Divider />
      <List >
        <Typography align='center' gutterBottom> <EmojiEventsIcon />Work Anniversary's </Typography>
        {menuItems.map((menuItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{ backgroundColor: selectedItemforAnniversary === menuItem.text ? '#F9E0BB' : 'inherit' }}
              onClick={() => { handelAnniversaryClick(menuItem.urlString); handleItemClickforAnniversary(menuItem.text) }}>
              <ListItemText secondary={menuItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {role.toUpperCase() === "ADMIN" ? <>
        <List sx={{m:0,p:0}}>
          <ListItemButton onClick={()=>{onMenuItemSelect("AddFile")}}>
            <ListItemIcon className='icon-primary'>
            </ListItemIcon>
            <ListItemText primary={"Add File"} />
          </ListItemButton>
        </List>
        <Divider />
        <List sx={{m:0,p:0}}>
          <ListItemButton onClick={()=>{onMenuItemSelect("Addadmin")}}>
            <ListItemIcon className='icon-primary'>
            </ListItemIcon>
            <ListItemText primary={"Add Admin"} />
          </ListItemButton>
        </List>
        <Divider />
        <List sx={{m:0,p:0}}>
          <ListItemButton onClick={()=>{onMenuItemSelect("AllEmployee")}}>
            <ListItemIcon className='icon-primary'>
            </ListItemIcon>
            <ListItemText primary={"View All"} />
          </ListItemButton>
        </List>
        <Divider />
      </> : ""
      }
      {/* <MenuSideBar/> */}
    </div>
  );

  const handelLogout = () => {
    localStorage.clear();
    navigate('/signin');

  }

  return (
    <div >
     
          {isSmallScreen && (
             <AppBar sx={{ backgroundColor: 'white', height: "70.2px", }}>
    


             <Toolbar >
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Box sx={{
       
      }}>
        <IconButton sx={{   zIndex: 100,ml:22 }} onClick={handelLogout}>
          <LogoutIcon sx={{ mx: 1 }} />Logout
        </IconButton>

      </Box>
            </Toolbar>
      </AppBar>
          )}
          
       
         
      <Hidden smDown>
        <Drawer
          variant="permanent"
          open
          sx={{
            width: 204,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 220 },
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={open}
          sx={{
            width: 260, // Adjust the width as needed
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 260, // Adjust the width as needed
            },
          }}
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
