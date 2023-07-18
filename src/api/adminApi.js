
import axios from 'axios'

// const Baseurl='http://20.204.43.67:4000'
// const Baseurl="http://localhost:4000"



export const AddUser=async({firstName,lastName,email,password,confirmPassword,role})=>{
    let token=localStorage.getItem('token');
    let currentUserRole= 'admin';
    // console.log(currentUserRole)

    // console.log({firstName,lastName,email,password,confirmPassword,role,currentUserRole})

    const response=await axios.post('/addadmin',{firstName,lastName,email,password,confirmPassword,role,currentUserRole},{ headers: {"Authorization" : `Bearer ${token}`}})
    return response;
}

export const DeleteEmployeeApi=async(id)=>{
    let token=localStorage.getItem('token');

    const response=await axios.delete(`/employee/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
 console.log(response);
}

export const searchEmployee=async(q)=>{
    let token=localStorage.getItem('token');
    const response=await axios.get(`/employee/${q}`,{headers:{"Authorization":`Bearer ${token}`}})
    return response;
}

export const resetPasswordEmail=async(inputValue)=>{
    const response=await axios.post(`/sendmailfor-resetpassword`,{email:inputValue});
    return response;
}

export const getAllEmployee=async()=>{
    let token=localStorage.getItem('token');

    const response=await axios.get('/employee',{ headers: {"Authorization" : `Bearer ${token}`}})
    // console.log(response);
    return response;
}