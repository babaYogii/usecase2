import axios from 'axios'


const BaseUrl='http://localhost:4000'



export const signup=async({firstName,lastName,email,password,confirmPassword})=>{
    // const {}=data;
   
        
        const response=await axios.post(BaseUrl+'/signup',{firstName,lastName,email,password,confirmPassword});
        return response;
        // console.log(response.message);

    

}

