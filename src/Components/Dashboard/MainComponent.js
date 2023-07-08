import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent,  Divider, Typography } from '@mui/material';

const MainComponent = ({ birthday }) => {
  const [sortedBirthdays, setSortedBirthdays] = useState([]);
  console.log(sortedBirthdays)



  const birthdayCardColor =
    ["#CBE4F9","#CDF5F6","#EFF9DA","#F9EBDF","#F9D8D6","#D6CDEA"
          ]

  useEffect(() => {
    const sortedArray = [...birthday].sort((a, b) => {
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

    // Update the sorted birthdays state
    setSortedBirthdays(sortedArray);
  }, [birthday]);

  return (
    <div>
      <Box sx={{ position: 'absolute', top: 70, width: '80%' }}>
        <Box sx={{ height: '20px', padding: 2 }}>
          <Typography variant='h6' position='absolute'>
            {("Birthdays").toUpperCase()}
          </Typography>
        </Box>
        <Box sx={{ height: '300px', overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }} >
          <Box flex={3} sx={{ display: 'flex', minWidth: 'fit-content', '&::-webkit-scrollbar': { display: 'none' } }} >
            {sortedBirthdays.length > 0 ?
              sortedBirthdays.map((birthday, index) => {
                return (
                  <Card sx={{ minWidth: 200, height: 280, marginX: 2,py:0,my:0,backgroundColor: birthdayCardColor[Math.floor(Math.random() * birthdayCardColor.length)] }} key={index}>
                    {/* <CardHeader title="Employee Details" typographyProps={{ fontSize: '0.1rem' }} /> */}
                    
                    <CardContent>

                      <Typography variant="h4" component='h1' color="text.primary"  gutterBottom>
                        {birthday.employeename}
                      </Typography>
                      <Typography variant="body1" color="text.primary" gutterBottom>
                        DOB: {(birthday.dob).toString().slice(0, 10)}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                         {birthday.employeeemail}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Favourite Color: {birthday.favouriteColour}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Favourite Food: {birthday.favouritefood}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Favourite Place: {birthday.placeofinterest}
                      </Typography>
                    </CardContent>
                    
                  </Card>
                );
              }) :
              <Typography variant='h3' sx={{ width:'100%' }} align='center'>"No-upcoming Birthdays "</Typography>

            }
          </Box>
        </Box>
        <Divider />
        <Box sx={{ height: '20px', padding: 2 }}>
          <Typography variant='h6' position='absolute' >
            {("work-anniversaries").toUpperCase()}
          </Typography>
        </Box>
        <Box sx={{ height: '300px', overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
          <Box flex={3} sx={{ display: 'flex', minWidth: 'fit-content' }}>
            {sortedBirthdays.map((birthday, index) => {
              return (
                <Card sx={{ minWidth: 200, height: 280, marginX: 2 }} key={index}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {birthday.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date of Birth: {new Date(birthday.dob).getDate()}/{new Date(birthday.dob).getMonth() + 1}/{new Date(birthday.dob).getFullYear()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Work Anniversary: {new Date(birthday.dateofjoining).getDate()}/{new Date(birthday.dateofjoining).getMonth() + 1}/{new Date(birthday.dateofjoining).getFullYear()}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MainComponent;
