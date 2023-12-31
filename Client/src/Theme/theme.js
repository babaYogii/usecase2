import { createTheme } from "@mui/material";
import { amber } from "@mui/material/colors";

const theme=createTheme({

    palette:{
        primary:{
            main:"#884A39",
        },
        secondary:{
            main:"#C38154"
        },
        tertiary: {
            main: "#FFC26F",
            contrastText: '#fff',
          },
          PrimaryLight:{
            main:"#F9E0BB"
          },
          PrimarySecond: {
            main: "#884A39"
          },
          Amber:{
            main:amber[500],
            light:amber[300],
            dark:amber[700]
          },
          text: {
            primary: '#000000',
          },MuiTypography: {
            styleOverrides: {
              root: {
                fontFamily:'sans-serif'// Change the font-family here
              },
            },
          },
          typography: {
            fontFamily: 'sans-serif',
          },
    },
    components:{
        MuiTextField:{
            defaultProps:{
                variant:'standard',
                // color:"#FFC26F"
            },
            styleOverrides:{
              root:{
                minWidth: '275px'
              }
            }
        },
        MuiButton: {
          styleOverrides: {
            contained: {
              color: '#F9E0BB', // Set the text color for the contained button
              fontWeight: 600, // Set the font weight for the text
              borderRadius:'50px'
            },
          },
        },
        MuiSvgIcon: {
          defaultProps: {
            fontSize: "medium",
            color: "tertiary", // Set the default color for all SVG icons
          },
        },
        MuiCardContent: {
          styleOverrides: {
            root: {
              color: '#000000', // Set the desired text color, such as black (#000000)
            },
          },
        },

    }

})


export default theme;