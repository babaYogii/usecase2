import axios from 'axios'


const BaseUrl='http://localhost:4000'

let token=localStorage.getItem('token');

export const getUpcomingBirthdays=async(days)=>{
      
        const response=await axios.get(BaseUrl+`/birthdays/${days}`,{ headers: {"Authorization" : `Bearer ${token}`}});
   
        return response;

}

export const getUpcomingAnniversary=async(days)=>{
      
        const response=await axios.get(BaseUrl+`/anniversaries/${days}`,{ headers: {"Authorization" : `Bearer ${token}`}});
   
        return response;

}