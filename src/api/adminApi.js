
import axios from 'axios'

const Baseurl="http://localhost:4000"



export const AddUser=async({firstName,lastName,email,password,confirmPassword,role})=>{
    let token=localStorage.getItem('token');
    let currentUserRole= 'admin';
    // console.log(currentUserRole)

    console.log({firstName,lastName,email,password,confirmPassword,role,currentUserRole})

    const response=await axios.post(Baseurl+'/addadmin',{firstName,lastName,email,password,confirmPassword,role,currentUserRole},{ headers: {"Authorization" : `Bearer ${token}`}})
    return response;
}

export const DeleteEmployeeApi=async(id)=>{
    let token=localStorage.getItem('token');

    const response=await axios.delete(Baseurl+`/employee/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
}