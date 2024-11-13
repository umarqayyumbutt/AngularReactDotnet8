import axios from "axios";

const API_URL='https://localhost:44319/api/';

//**********************Province Functions**********************//
const getAllComplaints=async(token:string|null)=>{
    // const token = localStorage.getItem('token');
    
     const response= await axios.get(API_URL+'Provinces/GetListProvince', {
         headers: {
             'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         }
       });
       
      // alert(response);
    return response.data;
 };
 export default{
    getAllComplaints,
 }