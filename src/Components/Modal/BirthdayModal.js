import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicBirthdayModal({ open, handleClose, birthday }) {


  


  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Know More
          </Typography>
          <Typography variant='subtitle1' sx={{ mt: 2 }}>
            Palnning a surprise for <strong>{birthday.employeename}</strong>,here are few suggestions
          </Typography>
          <hr />
          <Box>
            <Typography display='block' variant='subtitle2'>Favourite color is <strong>{birthday.favouriteColour}</strong></Typography>
            <Typography variant='caption'>Things you can buy Clothing Item,ArtWork,Accessories.Which are available in {birthday.favouriteColour}</Typography>
          </Box>
          <hr />
          <Box>
            <Typography display='block' variant='subtitle2'>Favourite Food is <strong>{birthday.favouritefood}</strong></Typography>
            <Typography variant='caption'>Surprise your friend with a delicious treat from their favorite food category {birthday.favouritefood}</Typography>
          </Box>
          <hr />
          <Box>
            <Typography display='block' variant='subtitle2'>Favourite Place is <strong>{birthday.placeofinterest}</strong></Typography>
            <Typography variant='caption'> A travel-related gift, such as a travel book, a scratch-off map, or a personalized travel journal, which will help in travelling to {birthday.placeofinterest}</Typography>
          </Box>
          <hr />
          <Box>
            <Typography display='block' variant='subtitle2'><a href={`mailto:${(birthday.employeeemail).toString()}`} style={{  textDecoration: 'none' }}>Wish Now</a></Typography>

          </Box>
        </Box>
       
      </Modal>
    </div>
  );
}
