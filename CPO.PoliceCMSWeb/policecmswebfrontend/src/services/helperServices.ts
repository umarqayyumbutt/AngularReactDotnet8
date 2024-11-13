import axios from 'axios';

const API_URL='https://localhost:44319/api/';

//**********************Province Functions**********************//
const getAllDropDown=async(token:string|null,tableName:string,id:string)=>{
    // const token = localStorage.getItem('token');
    
    var request = {
        params: {
          id:Number(id),
          tableName:tableName,
          headers:{            
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
        }
      } 
     const response= await axios.get(API_URL+'DropDown/GetAllDropDownList',request);
       
       //alert(response);
    return response.data;
 };

 export default{getAllDropDown}