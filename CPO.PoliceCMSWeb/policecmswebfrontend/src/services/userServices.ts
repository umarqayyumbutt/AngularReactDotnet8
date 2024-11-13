import axios from 'axios';
import { ProvinceData } from '../types/ProvinceData';
import { RegionData } from '../types/RegionData';
import { RoleData } from '../types/RoleData';
import { DistrictData } from '../types/DistrictData';
import { DivisionData } from '../types/DivisionData';
import {CircleData} from'../types/CircleData';
import { PoliceStationData } from '../types/PoliceStationData';
import { BeatData } from '../types/BeatData';
import { UserData } from '../types/UserData';
import { ChangePasswordData } from '../types/ChangePasswordData';

const API_URL='https://localhost:44319/api/';

//**********************Province Functions**********************//
const getAllProvinces=async(token:string|null)=>{
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
 const updateProvince=async(token:string|null,province:ProvinceData)=>{
  const id=province.id;
  // const response=await axios.put(`https://localhost:44319/api/Provinces/${id}`, province, {
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   }
  // });

// alert(province);
  // var request = {
  //   params: {
  //     province:province,
  //     headers:{            
  //       'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   }
  //   }
  // } 
  // const response = await axios.put(API_URL+`Provinces/UpdateProvince/${province.id}`, request);
  // return response.data;
  try {
    const response = await axios.put(API_URL + `Provinces/UpdateProvince/${id}`, province, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('There was an error updating the province!', error);
    throw error;
  }
 };
 const deleteProvince=async(token:null|string,id:number)=>{
  var request = {
    params: {
      id:id,
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
  console.log(token);
  //console.log(provinceId);
       return await axios.delete(API_URL+'Provinces/DeleteProvince',request);
      
 };
 //**********************Province Functions**********************//
 //**********************Region Functions**********************//
 const saveRegion=async(region:RegionData,token:string)=>{
  //const token = localStorage.getItem('token');
 console.log(region);
  //alert(token);
  return axios.post(API_URL+'Regions/AddRegion',
  region,{headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  });
};
 const getAllRegions=(token:string|null,provinceId:string)=>{
  //alert(provinceId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '-1');
// params.append("provinceId",prvoinceId.toString());
var request = {
  params: {
    provinceId:provinceId,
    headers:{            
      'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  }
} 
console.log(token);
//console.log(provinceId);
     return axios.get(API_URL+'Regions/GetListRegion',request);
    
 };
 const getRegionById = async(regionid: string, token: string):Promise<RegionData> => {
  // var request = {
  //   params: {
  //     id:Number(id),
  //     headers:{            
  //       'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   }
  //   }
  // } 
  // const response = await axios.post(API_URL+'Regions/GetRegionById', request);
  const id=Number(regionid);
  //console.log(id);
  const response= await axios.post(API_URL+'Regions/GetRegionById',
    id,{headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  });
  return response.data;
};
const getAllRegionsByProvinceId=async(token:string|null,provinceId:string)=>{
 // alert(provinceId);
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
//console.log(token);
//console.log(provinceId);
     var response=await axios.get(API_URL+'Regions/GetAllRegions',request);
    // console.log(response.data);
     return response.data;
 };
const updateRegion = async (region: RegionData, token: string) => {

  
  try{const response = await axios.put(API_URL+`Regions/UpdateRegion/${region.id}/`, region, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
} catch (error) {
  console.error('There was an error updating the province!', error);
  throw error;
}
  // const response = await axios.put(`${API_URL}Regions/UpdateRegion/${id}`, region, {
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   }
  // });
  // return response.data;
};
 //**********************Region Functions**********************//
  //**********************District Functions**********************//
 
const saveDistrict=async(district:DistrictData,token:string)=>{
  //const token = localStorage.getItem('token');
 //console.log(district);
 //alert(JSON.stringify(district));
  //alert(token);
  return axios.post(API_URL+'Districts/AddDistrict',
  district,{headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  });
};
const getDistrictById=async(districtid:string,token:string):Promise<DistrictData>=>{

  // const id=Number(districtid);
  // //console.log(id);
  // const response= await axios.get(API_URL+'Districts/GetDistrictById',
  //   id,{headers: {
  //         'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     }
  // });
  // return response.data;
  var request = {
    params: {
      id:Number(districtid),
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
 // console.log(token);
  //console.log(provinceId);
       var response=await axios.get(API_URL+'Districts/GetDistrictById',request);
       //console.log(response.data);
       return response.data;
}
 const getAllDistricts=(token:string|null,regionId:string)=>{
  //alert(districtId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '-1');
// params.append("provinceId",prvoinceId.toString());
var request = {
  params: {
    regionId:regionId,
    headers:{            
      'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  }
} 
console.log(token);
//console.log(provinceId);
     return axios.get(API_URL+'Districts/GetListDistrict',request);
    
 };
 const getAllDistrictsByRegionId=async(token:string|null,regionId:string)=>{
  
 var request = {
   params: {
     regionId:Number(regionId),
     headers:{            
       'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   }
   }
 } 
 
      var response=await axios.get(API_URL+'Districts/GetAllDistricts',request);
     // console.log(response.data);
      return response.data;
  };
 const updateDistrict=async(district: DistrictData, token: string)=>{

  try{const response = await axios.put(API_URL+`Districts/UpdateDistrict/${district.id}/`, district, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
} catch (error) {
  console.error('There was an error updating the district!', error);
  throw error;
}
 };

  //**********************District Functions**********************//
   //**********************Division Functions**********************//
   const saveDivision=async(division:DivisionData,token:string)=>{
    //const token = localStorage.getItem('token');
   //console.log(district);
   alert(JSON.stringify(division));
    //alert(token);
    return axios.post(API_URL+'Divisions/AddDivision',
    division,{headers: {
            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });
  };
 const getAllDivisions=(token:string|null,districtId:string)=>{
  //alert(districtId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '-1');
// params.append("provinceId",prvoinceId.toString());
var request = {
  params: {
    districtId:districtId,
    headers:{            
      'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  }
} 
console.log(token);
//console.log(provinceId);
     return axios.get(API_URL+'Divisions/GetListDivision',request);
    
 };
 const getDivisionById=async(divisionid:string,token:string):Promise<DivisionData>=>{

  console.log(divisionid);
  var request = {
    params: {
      id:Number(divisionid),
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
       var response=await axios.get(API_URL+'Divisions/GetDivisionById',request);
       console.log(response.data);
       return response.data;
}
const getAllDivisionsByDistrictId=async(token:string|null,districtId:string)=>{
  
  var request = {
    params: {
      districtId:Number(districtId),
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
  
       var response=await axios.get(API_URL+'Divisions/GetAllDivisions',request);
      // console.log(response.data);
       return response.data;
   };
//  const getAllDistricts=(token:string|null,regionId:string)=>{
//   //alert(districtId);
//     // const token = localStorage.getItem('token');
// //     var params = new URLSearchParams();
// // params.append("id", '-1');
// // params.append("provinceId",prvoinceId.toString());
// var request = {
//   params: {
//     regionId:regionId,
//     headers:{            
//       'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json'
//   }
//   }
// } 
// console.log(token);
// //console.log(provinceId);
//      return axios.get(API_URL+'Districts/GetListDistrict',request);
    
//  };
 const updateDivision=async(division: DivisionData, token: string)=>{

  try{const response = await axios.put(API_URL+`Divisions/UpdateDivision/${division.id}/`, division, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
} catch (error) {
  console.error('There was an error updating the district!', error);
  throw error;
}
 };
     //**********************Division Functions**********************//
       //**********************Circle Functions**********************//
 const getAllCircles=(token:string|null,divisionId:string)=>{
  //alert(districtId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '-1');
// params.append("provinceId",prvoinceId.toString());
var request = {
  params: {
    divisionId:divisionId,
    headers:{            
      'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  }
} 
console.log(token);
//console.log(provinceId);
     return axios.get(API_URL+'Circles/GetListCircle',request);
    
 };
 const getCircleById=async(circleid:string,token:string):Promise<CircleData>=>{

  console.log(circleid);
  var request = {
    params: {
      id:Number(circleid),
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
       var response=await axios.get(API_URL+'Circles/GetCircleById',request);
       console.log(response.data);
       return response.data;
};
const getAllCirclesByDivisionId=async(token:string|null,divisionId:string)=>{
  
  var request = {
    params: {
      divisionId:Number(divisionId),
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
  
       var response=await axios.get(API_URL+'Circles/GetAllCircles',request);
      // console.log(response.data);
       return response.data;
   };
const updateCircle=async(circle: CircleData, token: string)=>{

  try{const response = await axios.put(API_URL+`Circles/UpdateCircle/${circle.id}/`, circle, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
} catch (error) {
  console.error('There was an error updating the circle!', error);
  throw error;
}
 };
  //**********************Circle Functions**********************//
  //**********************PoliceStation Functions**********************//

 const getAllPoliceStations=(token:string|null,circleId:string)=>{
  //alert(districtId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '-1');
// params.append("provinceId",prvoinceId.toString());
var request = {
  params: {
    circleId:circleId,
    headers:{            
      'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  }
} 
console.log(token);
//console.log(provinceId);
     return axios.get(API_URL+'PoliceStations/GetListPoliceStation',request);
    
 };
 const savePoliceStation=(policestation:PoliceStationData,token:string)=>{
 
  //alert(token);
  return axios.post(API_URL+'PoliceStations/AddPoliceStation',
    policestation,{headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
  });
};
const getPoliceStationById=async(policestationid:string,token:string):Promise<PoliceStationData>=>{

  console.log(policestationid);
  var request = {
    params: {
      id:Number(policestationid),
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
       var response=await axios.get(API_URL+'PoliceStations/GetPoliceStationById',request);
       console.log(response.data);
       return response.data;
};
const getAllPoliceStationByCircleId=async(token:string|null,circleId:string)=>{
  
  var request = {
    params: {
      circleId:Number(circleId),
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
  
       var response=await axios.get(API_URL+'PoliceStations/GetAllPoliceStations',request);
      // console.log(response.data);
       return response.data;
   };
const updatePoliceStation=async(policestation: PoliceStationData, token: string)=>{

  try{const response = await axios.put(API_URL+`PoliceStations/UpdatePoliceStation/${policestation.id}/`, policestation, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
} catch (error) {
  console.error('There was an error updating the policestation!', error);
  throw error;
}
 };
 //**********************PoliceStation Functions**********************//
  //**********************Beat Functions**********************//
 const getAllBeats=async(token:string|null,policestationId:string)=>{
  //alert(districtId);
    // const token = localStorage.getItem('token');
//     var params = new URLSearchParams();
// params.append("id", '-1');
// params.append("provinceId",prvoinceId.toString());
var request = {
  params: {
    policestationId:policestationId,
    headers:{            
      'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  }
} 
console.log(token);
//console.log(provinceId);
     var response=await axios.get(API_URL+'Beats/GetListBeat',request);
     return response.data;
    
 };
 const getBeatById=async(beatid:string,token:string):Promise<BeatData>=>{

  console.log(beatid);
  var request = {
    params: {
      id:Number(beatid),
      headers:{            
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    }
  } 
       var response=await axios.get(API_URL+'Beats/GetBeatById',request);
       console.log(response.data);
       return response.data;
}
const updateBeat=async(beat: BeatData, token: string)=>{

  try{const response = await axios.put(API_URL+`Beats/UpdateBeat/${beat.id}/`, beat, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
} catch (error) {
  console.error('There was an error updating the beat!', error);
  throw error;
}
 };
 //**********************Beats Functions***************************//
 //*******************Users Functions******************************//
 const getAllUsers=async(token:string|null)=>{

var request = {
  // params: {  
    headers:{            
      Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  //}
} ;
     var response=await axios.get(API_URL+'Users/GetAllUsers',request);
     console.log(response.data);
     return response.data;
    
 };
 const getUserById=async(userid:number,token:string)=>{
// alert(userid);
  // var request = {
  //   params: {
  //     id:Number(userid),
  //     headers:{            
  //       Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   }
  //   }
  // } 
  const id=Number(userid);
       var response=await axios.post(API_URL+'Users/GetUserById',id,{headers: {
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }});
       console.log(response.data);
       return response.data;
 };
 const updateUser=async(user:UserData,token:string)=>{
try{const response = await axios.put(API_URL+`Users/UpdateUser/${user.id}/`, user, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
} catch (error) {
  console.error('There was an error updating the beat!', error);
  throw error;
}

 };
 const getAllRoles=async(token:string|null)=>{

  var request = {
    // params: {  
      headers:{            
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    //}
  } ;
       var response=await axios.get(API_URL+'Users/GetAllRoles',request);
       console.log(response.data);
       return response.data;
      
   };
   const getRoleById=async(roleid:string,token:string)=>{
    const id=Number(roleid);
       var response=await axios.post(API_URL+'Users/GetRoleById',id,{headers: {
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }});
       console.log(response.data);
       return response.data;
     
     };

     const updateRole=async(role:RoleData,token:string)=>{
      try{const response = await axios.put(API_URL+`Users/UpdateRole/`, role, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        console.error('There was an error updating the role!', error);
        throw error;
      }
      
       };
const updatePassword=async(password:ChangePasswordData,token:string)=>{
  try{const response = await axios.put(API_URL+`Users/change-password/`, password, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('There was an error updating the beat!', error);
    throw error;
  }
  
   };
export default{
    // register,
    // login,
    // getAllRoles,
    getAllProvinces,
    updateProvince,
    saveRegion,
    getAllRegions,
    getRegionById,
    getAllRegionsByProvinceId,
    updateRegion,
    saveDistrict,
    getDistrictById,
    getAllDistrictsByRegionId,
    updateDistrict,
    getAllDistricts,
    saveDivision,
    getAllDivisions,
    getDivisionById,
    getAllDivisionsByDistrictId,
    updateDivision,    
    getAllCircles,
    getCircleById,
    getAllCirclesByDivisionId,
    updateCircle,
    getAllPoliceStations,
    savePoliceStation,
    getPoliceStationById,
    getAllPoliceStationByCircleId,
    updatePoliceStation,
    getAllBeats,
    getBeatById,
    updateBeat,
    deleteProvince,
    getAllUsers,
    getUserById,
    updateUser,
    getAllRoles,
    getRoleById,
    updateRole,
    updatePassword,
    // addProvince,
    // addRegion,
    // addRole,
    // getAllRegionsByProvinceId,
    // addDistrict,
    // addDivision,
    // getAllDistrictsByRegionId,
    // getAllDivisionsByDistrictId,
    // addCircle,
    // getAllCirclesByDivisionId,
    // addPoliceStation,
    // addBeat,
    // getAllPoliceStationsByCircleId,
    // getAllBeatsByPolicestationId
}