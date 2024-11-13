import React,{useState,useEffect} from 'react';
//import authServices from '../services/authServices';
import userServices from '../../services/userServices';
//import { RegionData } from '../../types/RegionData';
import{DistrictData} from'../../types/DistrictData';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store/store';
//import { ProvinceData } from '../../types/ProvinceData';
import {useNavigate} from 'react-router-dom';
import helperServices from '../../services/helperServices';
import { DropDownData } from '../../types/DropDownData';
import DropDownList from '../../components/Forms/DropDownList';
// interface Province {
//     id: number;
//     provincename: string;
//   }
//   interface Region{
// id:number;
// name:string
//   }
const District: React.FC=()=>{
//   const token = useSelector((state: RootState) => state.auth.token);
// const user = useSelector((state: RootState) => state.auth.user);
const token = useSelector((state: RootState) => state.auth.token);
//const user = useSelector((state: RootState) => state.auth.user);
  //const user = JSON.parse(localStorage.getItem('user')|| '{}');
const[district,setDistrict]=useState<DistrictData>({id:0,districtname:'',districtcode:'',districturduname:'',provinceid:0,regionid:0});
const[regions,setRegions]=useState<DropDownData[]>([]);
//const [selectedRegion, setSelectedRegion] = useState<string>('1');

const [provinces, setProvinces] = useState<DropDownData[]>([]);
//const [selectedProvince, setSelectedProvince] = useState<string>('1');
const navigate=useNavigate();

const handleDistrict = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //district.provinceid=Number(selectedProvince);
      //district.regionid=Number(selectedRegion);
      //district.create
      await userServices.saveDistrict(district,token|| '');
      alert('District saved successfully!');
      navigate('/district/districts');
    } catch (error) {
      alert('failed!');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDistrict({ ...district, [name]: value });
  };
  const handleProvinceChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
    // setSelectedProvince(event.target.value); // Update selected province
    //setSelectedProvince(id); // Update selected province
    setDistrict({ ...district, ['provinceid']: Number(id) });
    //alert(event.target.value);
    helperServices.getAllDropDown(token,'region',id).then((response)=>{
      // alert(JSON.stringify(response.data));
        setRegions(response);
       // alert(JSON.stringify(regions));
     });
    
   // alert(selectedProvince);
  };
  const handleRegionChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
    // setSelectedRegion(event.target.value); // Update selected province
    //setSelectedRegion(id); // Update selected province
    setDistrict({ ...district, ['regionid']: Number(id) });
    //alert(selectedRegion);
  };
  useEffect(() => {

    helperServices.getAllDropDown(token,'province','0').then((response)=>{
        //alert(JSON.stringify(response.data));
         setProvinces(response);
      });
      
    //alert(user?.provinceId);
    //console.log();
    //alert(JSON.parse(localStorage.getItem('user')|| '{}').provinceId);
    // This is just a mock example. Replace this with actual data fetching logic.
    // const loadDistrictForEdit = () => {
    //   //alert(user.provinceId);
    //   const districtData: DistrictData = {Id:0,District_Name:'',District_Code:'',District_Urduname:'',ProvinceId:0,RegionId:0};
     
    //   setDistrict(districtData);
    // };
    // loadDistrictForEdit();
  }, []);
  // const handleRoleChange = (event) => {
  //   setSelectedRole(event.target.value); // Update selected role
  // };
  return (
    <div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Add District
              </h3>
            </div>
      <form onSubmit={handleDistrict}>
      <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label>Name</label>
          <input id="districtname"
          name="districtname" type="text" value={district.districtname} onChange={handleChange} 
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          required />
        </div>   
        <div className="w-full xl:w-1/2">
          <label>Code</label>
          <input id="districtcode"
          name="districtcode" type="text" value={district.districtcode} onChange={handleChange} 
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          required />
        </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
          <label>Urdu Name</label>
          <input id="districturduname"
          name="districturduname" type="text" value={district.districturduname} onChange={handleChange} 
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          required />
          </div>     
          <div className="w-full xl:w-1/2">
          <DropDownList   
                    options={provinces}   
                    label="Province" 
                    selectedValue={district?.provinceid ? String(district.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
          {/* <label>Province</label>
          {
  
    <select onChange={handleProvinceChange}>
      {provinces.map((province) => (
        <option key={province.id} value={province.id}>{province.provincename}</option>
      ))}
    </select>
  
} */}
          {/* <select value={selectedProvince} onChange={handleProvinceChange} defaultValue={provinces[0].id}>        
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.province_Name}
          </option>
        ))}
      </select> */}
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
        <DropDownList   
                    options={regions}   
                    label="Region" 
                    selectedValue={district?.regionid ? String(district.regionid) : ''}  // Handle selected value   
                    onOptionChange={handleRegionChange}/>
          {/* <label>Region</label>
          <select value={selectedRegion} onChange={handleRegionChange}>        
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))} 
      </select>*/}
        </div>
        </div>
        </div>
        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">Save</button>
      </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default District;
