import axios from 'axios'

const BaseUrl="https://wishmaster.onrender.com"
// const BaseUrl='http://20.204.43.67:4000'


export const getUpcomingBirthdays=async(days)=>{
        let token=localStorage.getItem('token');
      
        const response=await axios.get(`${BaseUrl}/events/birthdays/${days}`,{ headers: {"Authorization" : `Bearer ${token}`}});
   
        return response;

}

export const getUpcomingAnniversary=async(days)=>{
        let token=localStorage.getItem('token');
      
        const response=await axios.get(`${BaseUrl}/events/anniversaries/${days}`,{ headers: {"Authorization" : `Bearer ${token}`}});
   
        return response;

}