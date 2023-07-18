import React, { useEffect, useState } from 'react';
import { Box, Divider,  Typography } from '@mui/material';

import Confetti from 'react-confetti';
import MainCard from './Cards/MainBirthdayCard';
import MainWorkAniversaryCard from './Cards/MainWorkAniversaryCard';


const MainComponent = ({ birthday, anniversary }) => {
  const [sortedBirthdays, setSortedBirthdays] = useState([]);
  const [sortedanniversary, setSortedanniversary] = useState([]);


  const [showConfetti, setShowConfetti] = React.useState(false);



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
    const sortedArrayforAnniversary = [...anniversary].sort((a, b) => {
      const dateA = new Date(a.dateofjoining);
      const dateB = new Date(b.dateofjoining);
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
    setSortedanniversary(sortedArrayforAnniversary)
  }, [birthday, anniversary]);

  React.useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
  }, [birthday, anniversary]);


  




  return (
    <div>
{/* ---------------------------------------Logout Functionality started-------------------------------------------------------------------------         */}

      <Box sx={{ position: 'absolute', top: 40, width: '84.5%',backgroundPosition: 'center',
    backgroundSize: 'cover',}}>
        

{/* ---------------------------------------Logout Functionality completed-------------------------------------------------------------------------         */}
        
{/* ---------------------------------------Card for Birthday started-------------------------------------------------------------------------         */}
          <Typography variant='h6' mx={2} mt={5} >
            {("Birthdays").toUpperCase()}
          </Typography>
        <Box sx={{
          height: '275px', overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' }
        }} >
          <Box flex={3} sx={{ display: 'flex', mx: 3, minWidth: 'fit-content', '&::-webkit-scrollbar': { display: 'none' } }} >


{/* ---------------------------------------Rendering different card--------------------------------------------------------------------         */}

            {sortedBirthdays.length > 0 ?
              sortedBirthdays.map((birthday, index) => {
                return (
                  <MainCard birthday={birthday} index={index} key={index} />
                );
              }) :
              <Typography variant='h3' sx={{ width: '100%',fontSize:'32px',mt:10 }} align='center'>" No-upcoming Birthdays "</Typography>

            }
          </Box>
        </Box>
        <Divider />
{/* ---------------------------------------Card for Birthday Completed-------------------------------------------------------------------------         */}

        <Box sx={{ height: '20px', padding: 2 }}>
          <Typography variant='h6' mx={2} position='absolute' >
            {("work-anniversaries").toUpperCase()}
          </Typography>
        </Box>
        <Box sx={{ height: '275px', overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
          <Box flex={3} sx={{ display: 'flex', mx: 3, minWidth: 'fit-content', }}>
            {sortedanniversary.length > 0 ? sortedanniversary.map((anniversary, index) => {
              return (

                <MainWorkAniversaryCard birthday={anniversary} index={index} key={index} />
              );
            }) :
              <Typography variant='h3' sx={{ width: '100%',fontSize:'32px',mt:10 }} align='center'>" No-upcoming work Anniversary "</Typography>
            }
          </Box>
        </Box>
        {(showConfetti && (birthday.length >0 || anniversary.length >0) )&& (
          <Confetti
            width={window.innerWidth - 270}
            height={window.innerHeight - 85}
            numberOfPieces={100}

          />
        )}
      </Box>

    </div>
  );
};

export default MainComponent;
