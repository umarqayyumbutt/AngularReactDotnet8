import React,{useState,useEffect} from 'react';
import authServices from '../../services/authServices';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store/store';
//import { UserData } from '../../types/UserData';
import { RegisterData } from '../../types/RegisterData';
import {useNavigate} from 'react-router-dom';
// import { ProvinceData } from '../../types/ProvinceData';
// import { RegionData } from '../../types/RegionData';
// import { DistrictData } from '../../types/DistrictData';
// import { DivisionData } from '../../types/DivisionData';
// import { CircleData } from '../../types/CircleData';
// import { PoliceStationData } from '../../types/PoliceStationData';
// import { BeatData } from '../../types/BeatData';
//import '../../src/LeftMenu.css';
import DropDownList from '../../components/Forms/DropDownList';
import { DropDownData } from '../../types/DropDownData';
import helperServices from '../../services/helperServices';
// interface Role {
//   id: number;
//   name: string;
// }
// interface Province {
//   id: number;
//   province_Name: string;
// }
// interface Region{
//   id:number;
//   name:string
// }
// interface District{
//   id:number;
//   district_Name:string
// }
// interface Division{
//   id:number;
//   division_Name:string
// }
// interface Circle{
//   id:number;
//   circle_Name:string
// }
// interface PoliceStation{
//   id:number;
//   pS_Name:string
// }
// interface Beat{
//   Id:number;
//   beatName:string
// }
const Register: React.FC=()=>{

  const[register,setRegister]=useState<RegisterData>({Id:0,Username:'',email:'',Role:'',Password:'',Resource_Name:'',cellNo:'',ShiftId:0,ProvinceId:0,RegionId:0,DistrictId:0,DivisionId:0,CircleId:0,PS_id:0,BeatId:0});


// const[username,setUsername]=useState('');
// const[email,setEmail]=useState('');
// const[resource_Name,setResourceName]=useState('');
// const[cellNo,setCellNo]=useState('');
// const[shiftId,setShiftId]=useState('');
// const[password,setPassword]=useState('');

const [roles, setRoles] = useState<DropDownData[]>([]);
//const [selectedRole, setSelectedRole] = useState<string>('');


//const [selectedProvince, setSelectedProvince] = useState<string>('');
const [provinces, setProvinces] = useState<DropDownData[]>([]);

const[regions,setRegions]=useState<DropDownData[]>([]);
//const [selectedRegion, setSelectedRegion] = useState<string>('1');

const[districts,setDistricts]=useState<DropDownData[]>([]);
//const [selectedDistrict, setSelectedDistrict] = useState<string>('1');

const[divisions,setDivisions]=useState<DropDownData[]>([]);
//const [selectedDivision, setSelectedDivision] = useState<string>('1');

const[circles,setCircles]=useState<DropDownData[]>([]);
//const [selectedCircle, setSelectedCircle] = useState<string>('1');

const[policestations,setPoliceStations]=useState<DropDownData[]>([]);
//const [selectedPoliceStation, setSelectedPoliceStation] = useState<string>('1');

const[beats,setBeats]=useState<DropDownData[]>([]);
//const [selectedBeat, setSelectedBeat] = useState<string>('1');


const token = useSelector((state: RootState) => state.auth.token);
const user = useSelector((state: RootState) => state.auth.user);


const [errors, setErrors] = useState<{ [key: string]: string }>({});
const navigate=useNavigate();
const handleRegionChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
  //setSelectedRegion(id); // Update selected province
  setRegister({ ...register, ['RegionId']: Number(id) });
  helperServices.getAllDropDown(token,'district',id).then((response)=>{
      //alert(JSON.stringify(response.data));
       setDistricts(response);
    });
  //alert(selectedRegion);
};
const handleDistrictChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
  //setSelectedDistrict(id); // Update selected district
  setRegister({ ...register, ['DistrictId']: Number(id) });
  helperServices.getAllDropDown(token,'division',id).then((response)=>{
      //alert(JSON.stringify(response.data));
       setDivisions(response);
    });
  //alert(selectedRegion);
};
const handleDivisionChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
  //setSelectedDivision(id); // Update selected division
  setRegister({ ...register, ['DivisionId']: Number(id) });
  helperServices.getAllDropDown(token,'circle',id).then((response)=>{
      //alert(JSON.stringify(response.data));
      setCircles(response);
    });
  //alert(selectedRegion);
};
const handleCircleChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
  //setSelectedCircle(id); // Update selected division
  setRegister({ ...register, ['CircleId']: Number(id) });
  helperServices.getAllDropDown(token,'policestation',id).then((response)=>{
      setPoliceStations(response);
      //alert(JSON.stringify(response.data));
       
    });
  //alert(selectedRegion);
};
const handlePoliceStationChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
 // setSelectedPoliceStation(id); // Update selected division
  //alert(id);
  // authServices.getAllBeatsByPolicestationId(token,event.target.value).then((response)=>{
  //   setPoliceStations(response.data);
  //   alert(JSON.stringify(response.data));
     
  // });
  setRegister({ ...register, ['PS_id']: Number(id) });
  helperServices.getAllDropDown(token,'beat',id).then((response)=>{
    setBeats(response);
    alert(JSON.stringify(response));
     
  });
  //alert(selectedRegion);
};

const handleBeatChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
  //setSelectedBeat(id); // Update selected division
  setRegister({ ...register, ['BeatId']: Number(id) });
  console.log(id);
  //alert(selectedRegion);
};


useEffect(()=>{
  if (token) {
    console.log('User:', user);
    console.log('Token:', token);
  }
    helperServices.getAllDropDown(token,'role','0').then((response)=>{
      //alert(response.data);
       setRoles(response);
    });
    helperServices.getAllDropDown(token,'province','0').then((response)=>{
          //alert(JSON.stringify(response.data));
           setProvinces(response);
        });
   
},[token]);
// useEffect(()=>{
 
//   authServices.getAllProvinces(token).then((response)=>{
//     alert(JSON.stringify(response.data));
//      setProvinces(response.data);
//   });
// },[]);
const handleRoleChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
  //setSelectedRole(event.target.value); // Update selected role
  //alert(id);
  setRegister({ ...register, ['Role']: id });
};
const handleProvinceChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
  //setSelectedProvince(id); // Update selected province
  setRegister({ ...register, ['ProvinceId']: Number(id) });
  helperServices.getAllDropDown(token,'region',id).then((response)=>{
    // alert(JSON.stringify(response.data));
    setRegister({...register,['ProvinceId']:Number(id)});
      setRegions(response);
     // alert(JSON.stringify(regions));
   });
};

// Validation functions
const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 6;
};

const validateCellNo = (cellNo: string) => {
  const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number
  return phonePattern.test(cellNo);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  //console.log(e.target.name+'  value:'+e.target.value);
  setRegister({ ...register, [name]: name === 'ShiftId' ? Number(value) : value, });
};
const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!register.Username) newErrors.Username = 'Username is required';
    if (!validateEmail(register.email)) newErrors.email = 'Email is invalid';
    if (!validatePassword(register.Password)) newErrors.Password = 'Password must be at least 6 characters';
    if (!validateCellNo(register.cellNo)) newErrors.cellNo = 'Cell number must be 10 digits';

    // Add more validation for other fields as necessary
    // Example: if (!register.ShiftId) newErrors.ShiftId = 'Shift ID is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    try {
        // register.ProvinceId=Number(selectedProvince);
        // register.RegionId=Number(selectedRegion);
        // register.DistrictId=Number(selectedDistrict);
        // register.DivisionId=Number(selectedDivision);
        // register.CircleId=Number(selectedCircle);
        // register.PS_id=Number(selectedPoliceStation);
        //register.Role=selectedRole;
      await authServices.register(register,token);
      alert('User registered successfully!');
      navigate('/user/users');
    } catch (error) {
      alert('Registration failed!');
    }
  };
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
              Register
              </h3>
            </div>
      <form onSubmit={handleRegister}>
      <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label>Username</label>
              <input type="text" id="Username" name="Username" value={register.Username} onChange={handleChange} 
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required />
              {errors.Username && <span className="error">{errors.Username}</span>}
            </div>
            <div className="w-full xl:w-1/2">
              <label>Email</label>
              <input type="text" id="email" name="email" value={register.email} onChange={handleChange} 
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
                <label>Password</label> 
                <input type="password" id="Password" name="Password" value={register.Password} onChange={handleChange} 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required />
                {errors.Password && <span className="error">{errors.Password}</span>}
            </div>
            <div className="w-full xl:w-1/2">
                <label>resource Name</label>
                <input type="text" id="Resource_Name" name="Resource_Name" value={register.Resource_Name} onChange={handleChange} 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required />
            </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label>Cell No</label>
              <input type="text" id="cellNo" name="cellNo" value={register.cellNo} onChange={handleChange} 
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required />
              {errors.cellNo && <span className="error">{errors.cellNo}</span>}
            </div>
            <div className="w-full xl:w-1/2">
            
                    <h3>Select Shift</h3>
                    
                    <div>
                      <label>
                        <input
                          type="radio"
                          id="MorningShiftId"
                          name="ShiftId"
                          value="0"
                          checked={register.ShiftId === 0}
                          onChange={handleChange}
                        />
                        Morning Shift
                      </label>
                    </div>
                    
                    <div>
                      <label>
                        <input
                          type="radio"
                          id="NightShiftId"
                          name="ShiftId"
                          value="1"
                          checked={register.ShiftId === 1}
                          onChange={handleChange}
                        />
                        Night Shift
                      </label>
                    </div>

                    {/* <p>Selected Shift: {register.ShiftId === 0 ? 'Morning Shift' : 'Night Shift'}</p> */}
                  
              {/* <label>Shift Id</label>
              <input type="text" id="shiftId" name="shiftId" value={register.ShiftId} onChange={handleChange} 
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required /> */}
            </div>
        </div>        
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
            <DropDownList   
                    options={roles}   
                    label="Role" 
                    selectedValue={register?.Role ? String(register.Role) : ''}  // Handle selected value   
                    onOptionChange={handleRoleChange}/>
                  {/* <label>Role</label>
                  <select value={selectedRole} onChange={handleRoleChange}>
                      <option value="" disabled>Select a role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select> */}
            </div>
            <div className="w-full xl:w-1/2">
            <DropDownList   
                    options={provinces}   
                    label="Province" 
                    selectedValue={register?.ProvinceId ? String(register.ProvinceId) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
                  {/* <label>Province</label>
                  <select value={selectedProvince} onChange={handleProvinceChange}>
                <option value="" disabled>Select a province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.provincename}
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
                    selectedValue={register?.RegionId ? String(register.RegionId) : ''}  // Handle selected value   
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
                    selectedValue={register?.DistrictId ? String(register.DistrictId) : ''}  // Handle selected value   
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
                    selectedValue={register?.DivisionId ? String(register.DivisionId) : ''}  // Handle selected value   
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
            <div className="w-full xl:w-1/2">
                <DropDownList   
                    options={circles}   
                    label="Circle" 
                    selectedValue={register?.CircleId ? String(register.CircleId) : ''}  // Handle selected value   
                    onOptionChange={handleCircleChange}/>
                {/* <label>Circle</label>
                  <select value={selectedCircle} onChange={handleCircleChange}>
                  {circles.map((circle) => (
                    <option key={circle.id} value={circle.id}>
                      {circle.circlename}
                    </option>
                  ))}
                  </select> */}
            </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
            <DropDownList   
                    options={policestations}   
                    label="PoliceStation" 
                    selectedValue={register?.PS_id ? String(register.PS_id) : ''}  // Handle selected value   
                    onOptionChange={handlePoliceStationChange}/>
                {/* <label>Police Station</label>
                <select value={selectedPoliceStation} onChange={handlePoliceStationChange}>
                  {policestations.map((policestation) => (
                    <option key={policestation.id} value={policestation.id}>
                      {policestation.psname}
                    </option>
                  ))}
                </select> */}
            </div>
            <div className="w-full xl:w-1/2">
            <DropDownList   
                    options={beats}   
                    label="Beat" 
                    selectedValue={register?.BeatId ? String(register.BeatId) : ''}  // Handle selected value   
                    onOptionChange={handleBeatChange}/>
                  {/* <label>Beat</label>
                  <select value={selectedBeat} onChange={handleBeatChange}>
                    {beats.map((beat) => (
                      <option key={beat.id} value={beat.id}>
                        {beat.beatname}
                      </option>
                    ))}
                  </select> */}
              </div>
        </div>
      </div>
        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">Register</button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Register;
