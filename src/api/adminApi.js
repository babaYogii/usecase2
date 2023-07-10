
import axios from 'axios'

const Baseurl="http://localhost:4000"


let token=localStorage.getItem('token');

export const AddUser=async({firstName,lastName,email,password,confirmPassword,role})=>{
    let currentUserRole= 'admin';
    // console.log(currentUserRole)

    console.log({firstName,lastName,email,password,confirmPassword,role,currentUserRole})

    const response=await axios.post(Baseurl+'/addadmin',{firstName,lastName,email,password,confirmPassword,role,currentUserRole},{ headers: {"Authorization" : `Bearer ${token}`}})
    return response;
}