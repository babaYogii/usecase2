import axios from 'axios'


// const BaseUrl='http://localhost:4000'
// const Baseurl='http://20.204.43.67:4000'



export const signup=async({firstName,lastName,email,password,confirmPassword})=>{
    // const {}=data;
         
    console.log(window.location.hostname+window.location.pathname) 
        const response=await axios.post('/auth/signup',{firstName,lastName,email,password,confirmPassword});
        return response;
}


export const signin=async({email,password})=>{

    console.log(window.location.hostname+window.location.pathname) 

    const response=await axios.post('/auth/signin',{email,password});
    return response;
}

export const getAllEmployee=async()=>{
    let token=localStorage.getItem('token');

    const response=await axios.get('/events/employee',{ headers: {"Authorization" : `Bearer ${token}`}})
    // console.log(response);
    return response;
}

export const resetPassword=async({token,password,confirmPassword})=>{
    // /reset-password/:token
    // console.log(BaseUrl+`/reset-password/${token}`)
    const response=await axios.put(`/auth/reset-password/${token}`,{password,confirmPassword})
    return response;
    
}