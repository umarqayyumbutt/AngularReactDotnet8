import React,{useState,useEffect} from 'react';
import authServices from '../../services/authServices';
// import { RegionData } from '../types/RegionData';
// import{DistrictData} from'../types/DistrictData';
//import{DivisionData} from'../types/DivisionData';
import { CircleData } from '../../types/CircleData';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store/store';
//import { DivisionData } from '../types/DivisionData';
//import { DistrictData } from '../types/DistrictData';
//import { RegionData } from '../types/RegionData';
//import { ProvinceData } from '../types/ProvinceData';
//import userServices from '../../services/userServices';
import {useNavigate} from 'react-router-dom';
import DropDownList from '../../components/Forms/DropDownList';
import helperServices from '../../services/helperServices';
import { DropDownData } from '../../types/DropDownData';
// interface Province {
//     id: number;
//     province_Name: string;
//   }
//   interface Region{
//     id:number;
//     name:string
//   }
//   interface District{
//     id:number;
//     district_Name:string
//     }
//       interface Division{
//         id:number;
//         division_Name:string
//           }

const Circle: React.FC=()=>{
//   const token = useSelector((state: RootState) => state.auth.token);
// const user = useSelector((state: RootState) => state.auth.user);
const token = useSelector((state: RootState) => state.auth.token);
//const user = useSelector((state: RootState) => state.auth.user);
  //const user = JSON.parse(localStorage.getItem('user')|| '{}');
const[circle,setCircle]=useState<CircleData>({id:0,circlename:'',abbr:'',circleurduname:'',provinceid:0,regionid:0,districtid:0,divisionid:0});

const[divisions,setDivisions]=useState<DropDownData[]>([]);
//const [selectedDivision, setSelectedDivision] = useState<string>('1');


const[districts,setDistricts]=useState<DropDownData[]>([]);
// [selectedDistrict, setSelectedDistrict] = useState<string>('1');

const[regions,setRegions]=useState<DropDownData[]>([]);
//const [selectedRegion, setSelectedRegion] = useState<string>('1');

const [provinces, setProvinces] = useState<DropDownData[]>([]);
//const [selectedProvince, setSelectedProvince] = useState<string>('1');
const navigate=useNavigate();

const handleCircle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     // circle.provinceid=Number(selectedProvince);
      //circle.regionid=Number(selectedRegion);
     // circle.districtid=Number(selectedDistrict);
      //circle.divisionid=Number(selectedDivision);

      await authServices.addCircle(circle,token|| '');
      alert('Circle saved successfully!');
      navigate('/circle/circles');
    } catch (error) {
      alert('failed!');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCircle({ ...circle, [name]: value });
  };
  const handleProvinceChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
    //setSelectedProvince(id); // Update selected province
    //alert(event.target.value);
    setCircle({ ...circle, ['provinceid']: Number(id) });
    helperServices.getAllDropDown(token,'region',id).then((response)=>{
      // alert(JSON.stringify(response.data));
        setRegions(response);
       // alert(JSON.stringify(regions));
     });
    
   // alert(selectedProvince);
  };
  const handleRegionChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
    //setSelectedRegion(id); // Update selected province
    setCircle({ ...circle, ['regionid']: Number(id) });
    helperServices.getAllDropDown(token,'district',id).then((response)=>{
        alert(JSON.stringify(response.data));
         setDistricts(response);
      });
    //alert(selectedRegion);
  };
  const handleDistrictChange =(id:string)=>{ // (event: ChangeEvent<HTMLSelectElement>) => {
    //setSelectedDistrict(id); // Update selected district
    setCircle({ ...circle, ['districtid']: Number(id) });
    helperServices.getAllDropDown(token,'division',id).then((response)=>{
        alert(JSON.stringify(response.data));
         setDivisions(response);
      });
    //alert(selectedRegion);
  };
  const handleDivisionChange = (id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
    //setSelectedDivision(id); // Update selected division
    setCircle({ ...circle, ['divisionid']: Number(id) });
    // helperServices.getAllDropDown(token,'circle',id).then((response)=>{
    //     alert(JSON.stringify(response.data));
    //     setCircle(response);
    //   });
    //alert(selectedRegion);
  };
  useEffect(() => {
    helperServices.getAllDropDown(token,'province','0').then((response)=>{
      //alert(JSON.stringify(response.data));
       setProvinces(response);
    });
    // userServices.getAllProvinces(token).then((response)=>{
    //     //alert(JSON.stringify(response.data));
    //      setProvinces(response.data);
    //   });
      
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
          Add Circle
          </h3>
        </div>
      <form onSubmit={handleCircle}>
      <div className="p-6.5">
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label>Name</label>
          <input id="circlename"
          name="circlename" type="text" value={circle.circlename} onChange={handleChange} 
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          required />
        </div>   
        <div className="w-full xl:w-1/2">
          <label>Abbr</label>
          <input id="abbr"
          name="abbr" type="text" value={circle.abbr} onChange={handleChange} 
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          required />
        </div>
      </div>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label>Urdu Name</label>
          <input id="circleurduname"
          name="circleurduname" type="text" value={circle.circleurduname} onChange={handleChange} 
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          required />
        </div>     
        <div className="w-full xl:w-1/2">
        <DropDownList   
                    options={provinces}   
                    label="Province" 
                    selectedValue={circle?.provinceid ? String(circle.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
          {/* <label>Province</label>
          {  
    <select onChange={handleProvinceChange}>
      {provinces.map((province) => (
        <option key={province.id} value={province.id}>{province.provincename}</option>
      ))}
    </select>} */}
    
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
                    selectedValue={circle?.regionid ? String(circle.regionid) : ''}  // Handle selected value   
                    onOptionChange={handleRegionChange}/>
          {/* <label>Region</label>
          <select value={selectedRegion} onChange={handleRegionChange}>        
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select> */}
        </div>
        <div className="w-full xl:w-1/2">
        <DropDownList   
                    options={districts}   
                    label="District" 
                    selectedValue={circle?.districtid ? String(circle.districtid) : ''}  // Handle selected value   
                    onOptionChange={handleDistrictChange}/>
          {/* <label>District</label>
          <select value={selectedDistrict} onChange={handleDistrictChange}>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.districtname}
          </option>
        ))}
      </select> */}
        </div>
      </div>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
      <div className="w-full xl:w-1/2">
      <DropDownList   
                    options={divisions}   
                    label="Division" 
                    selectedValue={circle?.divisionid ? String(circle.divisionid) : ''}  // Handle selected value   
                    onOptionChange={handleDivisionChange}/>
          {/* <label>Division</label>
          <select value={selectedDivision} onChange={handleDivisionChange}>        
        {divisions.map((division) => (
          <option key={division.id} value={division.id}>
            {division.divisionname}
          </option>
        ))}
      </select> */}
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

export default Circle;
