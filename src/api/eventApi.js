import axios from 'axios'


const BaseUrl='http://localhost:4000'


export const getUpcomingBirthdays=async(days)=>{
        let token=localStorage.getItem('token');
      
        const response=await axios.get(BaseUrl+`/birthdays/${days}`,{ headers: {"Authorization" : `Bearer ${token}`}});
   
        return response;

}

export const getUpcomingAnniversary=async(days)=>{
        let token=localStorage.getItem('token');
      
        const response=await axios.get(BaseUrl+`/anniversaries/${days}`,{ headers: {"Authorization" : `Bearer ${token}`}});
   
        return response;

}