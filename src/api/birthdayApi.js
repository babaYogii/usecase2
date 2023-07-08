import axios from 'axios'


const BaseUrl='http://localhost:4000'

// localhost:4000/birthdays

export const getUpcomingBirthdays=async(days)=>{
    // const {}=data;
   
        
        const response=await axios.get(BaseUrl+`/birthdays/${days}`);
        // console.log(response)
        return response;
        // console.log(response.message);

    

}