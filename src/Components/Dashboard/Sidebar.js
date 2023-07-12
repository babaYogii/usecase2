import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CakeIcon from '@mui/icons-material/Cake';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { makeStyles } from '@mui/styles';
import { Menu, Inbox, Mail } from '@mui/icons-material';
import { AppBar,  Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { getUpcomingAnniversary, getUpcomingBirthdays } from '../../api/eventApi';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  toolbar: {
    boxShadow: theme.shadows[3], // Adjust the shadow value as needed

  },
}));



function Sidebar({ setBirthday, birthday, anniversary, setAnniversary }) {

  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [role, setRole] = React.useState('');
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = React.useState(null); // State to keep track of the selected item
  const [selectedItemforAnniversary, setSelectedItemforAnniversary] = React.useState(null); // State to keep track of the selected item

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleItemClickforAnniversary = (item) => {
    setSelectedItemforAnniversary(item);
  };

  const fetchBirthDate = async () => {
    try {
      const response = await getUpcomingBirthdays('1days');
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
    console.log(response);
  }

  const menuItems = [
    { text: '7 days', icon: <Inbox />, urlString: '7days' },
    { text: '14 days', icon: <Mail />, urlString: '14days' },
    { text: '1 month', icon: <Menu />, urlString: '1month' },
    { text: '6 months', icon: <Menu />, urlString: '6months' },
  ]

  const drawer = (
    <div >
      <Toolbar className={classes.toolbar} >
        <img src="../../ExcelWishMaster.png" alt='WishMaster' style={{ width: "100px", height: '70px', marginLeft: '-23px', marginRight: '-12px' }} />
        <Typography variant="h6" component="h1"  >{"WishMaster"}
        </Typography>
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
              onClick={() => { handelBirthClick(menuItem.urlString); handleItemClick(menuItem.text); }}>
              {/* <ListItemIcon className='icon-primary'> */}
              {/* {menuItem.icon} */}
              {/* </ListItemIcon> */}
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
              {/* <ListItemIcon className='icon-primary'> */}
              {/* {menuItem.icon} */}
              {/* </ListItemIcon> */}
              <ListItemText secondary={menuItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {role.toUpperCase() === "ADMIN" ? <>
        <List>
          <ListItemButton onClick={() => navigate('/upload')}>
            <ListItemIcon className='icon-primary'>
            </ListItemIcon>
            <ListItemText primary={"Add File"} />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={() => navigate('/addAdmin')}>
            <ListItemIcon className='icon-primary'>
            </ListItemIcon>
            <ListItemText primary={"Add Admin"} />
          </ListItemButton>
        </List>
        <Divider />
      </> : ""
      }
      {/* <MenuSideBar/> */}
    </div>
  );

  return (
    <div >
     
          {isSmallScreen && (
             <AppBar sx={{ backgroundColor: 'white', height: "70.2px" }}>
    


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
