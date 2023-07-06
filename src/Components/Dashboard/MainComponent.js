import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const MainComponent = ({ setBirthday, birthday }) => {
  const [sortedBirthdays, setSortedBirthdays] = useState([]);

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
            {("Upcoming Birthdays").toUpperCase()}
          </Typography>
        </Box>
        <Box sx={{ height: '300px', overflowX: 'auto','&::-webkit-scrollbar': { display: 'none' } }} >
          <Box flex={3} sx={{ display: 'flex', minWidth: 'fit-content', '&::-webkit-scrollbar': { display: 'none' } }} >
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
                      Work Anniversary:
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ height: '20px', padding: 2 }}>
          <Typography variant='h6' position='absolute'>
          {("upcoming workanniversaries").toUpperCase()}
          </Typography>
        </Box>
        <Box sx={{ height: '300px', overflowX: 'auto','&::-webkit-scrollbar': { display: 'none' }  }}>
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
                      Work Anniversary: 
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
