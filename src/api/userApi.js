import axios from 'axios'


const BaseUrl='http://localhost:4000'



export const signup=async({firstName,lastName,email,password,confirmPassword})=>{
    // const {}=data;
         
        const response=await axios.post(BaseUrl+'/signup',{firstName,lastName,email,password,confirmPassword});
        return response;
        // console.log(response.message) 
}


export const signin=async({email,password})=>{
    const response=await axios.post(BaseUrl+'/signin',{email,password});
    return response;
}

export const getAllEmployee=async()=>{
    let token=localStorage.getItem('token');

    const response=await axios.get(BaseUrl+'/employee',{ headers: {"Authorization" : `Bearer ${token}`}})
    console.log(response);
    return response;
}