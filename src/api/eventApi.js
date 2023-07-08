import axios from 'axios'


const BaseUrl='http://localhost:4000'


export const getUpcomingBirthdays=async(days)=>{
      
        const response=await axios.get(BaseUrl+`/birthdays/${days}`);
   
        return response;

}

export const getUpcomingAnniversary=async(days)=>{
      
        const response=await axios.get(BaseUrl+`/anniversaries/${days}`);
   
        return response;

}