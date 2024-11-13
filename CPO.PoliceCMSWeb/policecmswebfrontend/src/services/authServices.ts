 import axios from 'axios';
import { ProvinceData } from '../types/ProvinceData';
//import { RegionData } from '../types/RegionData';
import { RoleData } from '../types/RoleData';
//import { DistrictData } from '../types/DistrictData';
import { DivisionData } from '../types/DivisionData';
import {CircleData} from'../types/CircleData';
import { PoliceStationData } from '../types/PoliceStationData';
import { BeatData } from '../types/BeatData';
//import { UserData } from '../types/UserData';
import { RegisterData } from '../types/RegisterData';

const API_URL='https://localhost:44319/api/';

// const register=(username: string,email:string,password:string,role:string)=>{
//     return axios.post(API_URL+'',{
//         username,email,password,role
//     });
// };
const register=(register:RegisterData,token:string|null)=>{
  return axios.post(API_URL+'Users/Register',
    register,{headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });
};
const getAllUser=(token:string|null)=>{
  return axios.post(API_URL+'Users/GetAllUsers',
    register,{headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });
};
const login=(username:string,password:string)=>{
    const user= axios.post(API_URL+'Auth/Login',{
        username,
        password,
    });
    
    return user;
};

const getAllRoles=(token:string|null)=>{
    //const token1 = localStorage.getItem('token');
    // if (token) {
    //     const decodedToken = jwtDecode(token);
    //     const currentTime = Date.now() / 1000; // in seconds
    
    //     if (decodedToken.exp < currentTime) {
    //         console.log('Token expired');
    //         // Handle token expiry (e.g., redirect to login)
    //     }
    // }
    //alert(token);
    return axios.get(API_URL+'Users/GetAllRoles', {
        headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    //   .then(response => {
    //     //console.log(response.data);
    //     return(response);
    // })
    // .catch(error => {
    //     console.error('There was an error!', error);
    // });
};
const getAllProvinces=(token:string|null)=>{
   // const token = localStorage.getItem('token');
   
    return axios.get(API_URL+'Provinces/GetAllProvinces', {
        headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
   
};
const addProvince=(province:ProvinceData,token:string)=>{
    //const token = localStorage.getItem('token');
   
    //alert(token);
    return axios.post(API_URL+'Provinces/AddProvince',
    province,{headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });
};
// const addRegion=(region:RegionData,token:string)=>{
//     //const token = localStorage.getItem('token');
//    console.log(region);
//     //alert(token);
//     return axios.post(API_URL+'Regions/AddRegion',
//     region,{headers: {
//             'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//     });
// };
const addRole=async(role:RoleData,token:string)=>{
    //const token = localStorage.getItem('token');
   
    //alert(token);
    return axios.post(API_URL+'Users/AddRole',
    role,{
      headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });
};

const getAllRegionsByProvinceId=(token:string|null,provinceId:string)=>{
  //alert(provinceId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '0');
// params.append("provinceId",prvoinceId.toString());
var request = {
  params: {
    provinceId:Number(provinceId),
    headers:{            
      'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  }
} 
console.log(token);
//console.log(provinceId);
     return axios.get(API_URL+'Regions/GetAllRegions',request);
    
 };
 const getAllDistrictsByRegionId=(token:string|null,regionId:string)=>{
  //alert(regionId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '0');
// params.append("provinceId",prvoinceId.toString());
var request = {
  params: {
    regionId:Number(regionId),
    headers:{            
      'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  }
} 

console.log(token);
//console.log(provinceId);
     return axios.get(API_URL+'Districts/GetAllDistricts',request);
    
 };
 const getAllDivisionsByDistrictId=(token:string|null,districtId:string)=>{
  //alert(districtId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '0');
// params.append("provinceId",prvoinceId.toString());
    var request = {
      params: {
        districtId:Number(districtId),
          headers:{            
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    } 
    console.log(token);
    //console.log(provinceId);
    return axios.get(API_URL+'Divisions/GetAllDivisions',request);
    
 };
 const getAllCirclesByDivisionId=(token:string|null,divisionId:string)=>{
  //alert(divisionId);

    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '0');
// params.append("provinceId",prvoinceId.toString());
    var request = {
      params: {
        divisionId:Number(divisionId),
        headers:{            
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      }
    }
    console.log(token);
    //console.log(provinceId);
    return axios.get(API_URL+'Circles/GetAllCircles',request);
 }; 
 const getAllPoliceStationsByCircleId=(token:string|null,circleId:string)=>{
  alert(circleId);

    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '0');
// params.append("provinceId",prvoinceId.toString());
    var request = {
      params: {
        circleId:Number(circleId),
        headers:{            
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      }
    }
    console.log(token);
    //console.log(provinceId);
    return axios.get(API_URL+'PoliceStations/GetAllPoliceStations',request);
 };
 const getAllBeatsByPolicestationId=(token:string|null,policestaitonId:string)=>{
  alert(policestaitonId);

    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '0');
// params.append("provinceId",prvoinceId.toString());
    var request = {
      params: {
        policestaitonId:Number(policestaitonId),
        headers:{            
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      }
    }
    console.log(token);
    //console.log(provinceId);
    return axios.get(API_URL+'Beats/GetAllBeats',request);
 };
//  const addDistrict=(district:DistrictData,token:string)=>{
//     //const token = localStorage.getItem('token');
//    //console.log(district);
//    alert(JSON.stringify(district));
//     //alert(token);
//     return axios.post(API_URL+'Districts/AddDistrict',
//     district,{headers: {
//             'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//     });
// };

const addDivision=(division:DivisionData,token:string)=>{
  //const token = localStorage.getItem('token');
 //console.log(district);
 //alert(JSON.stringify(division));
  //alert(token);
  return axios.post(API_URL+'Divisions/AddDivision',
    division,{headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  });
};
const addCircle=(circle:CircleData,token:string)=>{
  //const token = localStorage.getItem('token');
 //console.log(district);
 //alert(JSON.stringify(division));
  //alert(token);
  return axios.post(API_URL+'Circles/AddCircle',
    circle,{headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  });
};
const addPoliceStation=(policestaiton:PoliceStationData,token:string)=>{
  //const token = localStorage.getItem('token');
 //console.log(district);
 alert(JSON.stringify(policestaiton));
  //alert(token);
  return axios.post(API_URL+'PoliceStations/AddPoliceStation',
    policestaiton,{headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  });
};
const addBeat=(beat:BeatData,token:string)=>{
  //const token = localStorage.getItem('token');
 //console.log(district);
 alert(JSON.stringify(beat));
  //alert(token);
  return axios.post(API_URL+'Beats/AddBeat',
    beat,{headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  });
};
export default{
    register,
    getAllUser,
    login,
    getAllRoles,
    getAllProvinces,
    addProvince,
    //addRegion,
    addRole,
    getAllRegionsByProvinceId,
    //addDistrict,
    addDivision,
    getAllDistrictsByRegionId,
    getAllDivisionsByDistrictId,
    addCircle,
    getAllCirclesByDivisionId,
    addPoliceStation,
    addBeat,
    getAllPoliceStationsByCircleId,
    getAllBeatsByPolicestationId
}