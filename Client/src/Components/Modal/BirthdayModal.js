import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';


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


  const colorOptions = [
    'Surprise your friend with beautiful items in their favorite color that will make them smile',
    'Gift your friend stylish accessories in their preferred hue to enhance their outfits',
    'Brighten your friend\'s day with artwork showcasing their favorite color',
    'Add a pop of their preferred color to their living space with decorative items',
    'Surprise your friend with a colorful gift that reflects their vibrant personality',
    'Make their day brighter with a thoughtful present in their favorite color',
    'Decorate their workspace with items in their preferred hue to boost their mood',
    'Create a customized playlist with songs that evoke the feelings of their favorite color',
    'Surprise them with a bouquet of flowers in shades of their favorite color',
    'Prepare a delicious meal featuring ingredients that match their favorite color palette',
  ];

  const foodOptions = [
    'Delight your friend with a mouthwatering treat from their favorite food category',
    'Treat your friend to their all-time favorite dish and watch their face light up',
    'Surprise your friend with a delicious meal prepared with love',
    'Indulge your friend in a scrumptious dessert that will satisfy their sweet tooth',
    'Organize a surprise picnic featuring their favorite foods in a scenic location',
    'Take them to a popular restaurant known for their specialty in their favorite cuisine',
    'Arrange a cooking class where they can learn to make their favorite dish from a chef',
    'Order a gourmet gift basket filled with delicacies from around the world',
    'Surprise them with a subscription to a monthly food delivery service tailored to their taste',
    'Plan a progressive dinner, visiting multiple restaurants for different courses of their favorite food',
  ];

  const placeOptions = [
    'Gift your friend a travel-related item to fuel their wanderlust for their favorite place',
    'Help your friend reminisce about their favorite place with a travel-themed surprise',
    'Surprise your friend with a travel book or journal to inspire their future adventures',
    'Plan a virtual tour of their beloved destination and explore it together',
    'Create a personalized itinerary for a day trip that recreates the essence of their favorite place',
    'Give them a gift card for a local restaurant that offers cuisine from their favorite place',
    'Book a guided tour that takes them to hidden gems and local attractions of their favorite place',
    'Arrange a movie night featuring films set in their favorite destination',
    'Surprise them with a travel-inspired piece of artwork or decor for their home',
    'Organize a themed party that transports them to the culture and ambiance of their favorite place',
  ];
  const FoodEmoji=["👅","😋","🤤","🤗"]
  const FavPlace=["😍","🌍","🏖️"]
  const getRandomOption = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const colorOption = getRandomOption(colorOptions);
  const foodOption = getRandomOption(foodOptions);
  const placeOption = getRandomOption(placeOptions);
  const foodEmoji=getRandomOption(FoodEmoji);
  const favouritePlace=getRandomOption(FavPlace);
  const isSmallerScreen=useMediaQuery('(max-width: 600px)');

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style,width: isSmallerScreen ? "75%" : "47%"}}>
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{fontSize:38,}}>
            Know More
          </Typography>
          <Typography variant='h5' sx={{ mt: 2 }}>
            Planning a surprise for <strong>{birthday.employeename} ?</strong>,here are few suggestions
          </Typography>
          <hr />
          <Box>
            <Typography display='block' variant='h6'>Favourite color is <strong>{birthday.favouriteColour}</strong></Typography>
            <Typography variant='subtitle1'>{colorOption}</Typography>
          </Box>
          <hr />
          <Box>
            <Typography display='block' variant='h6'>Favourite Food is <strong>{birthday.favouritefood}</strong><span style={{ fontSize: '1.8rem' }}>{foodEmoji}</span></Typography>
            <Typography variant='subtitle1'> {foodOption}</Typography>
          </Box>
          <hr />
          <Box>
            <Typography display='block' variant='h6'>Favourite Place is <strong>{birthday.placeofinterest}</strong><span style={{ fontSize: '1.8rem' }}>{favouritePlace}</span></Typography>
            <Typography fvariant='subtitle1'>{placeOption}</Typography>
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
