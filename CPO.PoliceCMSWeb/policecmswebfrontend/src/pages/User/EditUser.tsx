import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/Store/store';
import userService from '../../services/userServices';
//import { ProvinceData } from '../../types/ProvinceData';
// import { DistrictData } from '../../types/DistrictData';
// import { RegionData } from '../../types/RegionData';
// import { DivisionData } from '../../types/DivisionData';
// import { CircleData } from '../../types/CircleData';
//import { PoliceStationData } from '../../types/PoliceStationData';
//import { BeatData } from '../../types/BeatData';
import { UserData } from '../../types/UserData';
import helperService from '../../services/helperServices';
import { DropDownData } from '../../types/DropDownData';
import DropDownList from '../../components/Forms/DropDownList';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [user, setUser] = useState<UserData>({id:0,username:'',email:'',resourcename:'',cellno:'',shiftid:0,provinceid:0,regionid:0,districtid:0,divisionid:0,circleid:0,beatid:0});
 // const [beat, setBeat] = useState<BeatData[]>([]);
  //const [policestations, setPoliceStations] = useState<PoliceStationData[]>([]);
  const [circles, setCircles] = useState<DropDownData[]>([]);
  const [divisions, setDivisions] = useState<DropDownData[]>([]);
  const [provinces, setProvinces] = useState<DropDownData[]>([]);
  const [regions, setRegions] = useState<DropDownData[]>([]);
  const [districts, setDistricts] = useState<DropDownData[]>([]);

  useEffect(() => {
    if (token && id) {
      userService.getUserById(Number(id), token)
      .then((userData) => setUser (userData))
      .catch(error => console.error('There was an error fetching the User!', error));
       
//console.log(beat);

     //console.log(id);
//      userService.getBeatById(id, token)
//         .then((beatData) => setBeat (beatData))
//         .catch(error => console.error('There was an error fetching the Beat!', error));
         
// console.log(beat);
       
      //   userService.getAllProvinces(token)
      // .then((provincesData) => setProvinces(provincesData))
      // .catch(error => console.error('There was an error fetching provinces!', error));
      helperService.getAllDropDown(token,'province','0')
      .then((provincesData) => setProvinces(provincesData))
      .catch(error => console.error('There was an error fetching provinces!', error));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
     
        var provinceid=user.provinceid.toString();
      // userService.getAllRegionsByProvinceId(token,provinceid)
      // .then((regionsData) => setRegions(regionsData))
      helperService.getAllDropDown(token,'region',provinceid)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
//console.log(regions);
    }
  }, [provinces]);

  useEffect(() => {
    if (token) {
     
        var regionid=user.regionid.toString();
        // userService.getAllDistrictsByRegionId(token,regionid)
        // .then((districtsData) => setDistricts(districtsData))
        helperService.getAllDropDown(token,'district',regionid)
        .then((districtsData) => setDistricts(districtsData))
         .catch(error => console.error('There was an error fetching districts!', error));
  //console.log(regions);
    }
  }, [regions]);

  useEffect(() => {
    if (token) {
     
        var districtid=user.districtid.toString();
        // userService.getAllDivisionsByDistrictId(token,districtid)
        // .then((divisionData) => setDivisions(divisionData))
        helperService.getAllDropDown(token,'division',districtid)
        .then((divisionData) => setDivisions(divisionData))
         .catch(error => console.error('There was an error fetching divisions!', error));
  //console.log(districts);
    }
  }, [districts]);

  useEffect(() => {
    if (token) {
     
        var divisionid=user.divisionid.toString();
        // userService.getAllCirclesByDivisionId(token,divisionid)
        // .then((circleData) => setCircles(circleData))
        helperService.getAllDropDown(token,'circle',divisionid)
        .then((circleData) => setCircles(circleData))
         .catch(error => console.error('There was an error fetching circles!', error));
  //console.log(regions);
    }
  }, [divisions]);
  // useEffect(() => {
  //   if (token) {
     
  //       var circleid=user.circleid.toString();
  //       userService.getAllPoliceStationByCircleId(token,circleid)
  //       .then((policestationData) => setPoliceStations(policestationData))
  //        .catch(error => console.error('There was an error fetching policestations!', error));
  // //console.log(regions);
  //   }
  // }, [circles]);
  const handleUpdate = async () => {
    if (token && districts) {
      try {
        await userService.updateUser( user, token);
        navigate('/user/users');
      } catch (error) {
        console.error('There was an error updating the user!', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => prevUser ? { ...prevUser, [name]: name === 'shiftid' ? Number(value) : value, } : prevUser);
  };

  const handleProvinceChange =(selectedProvinceId: string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    //setDistrict((prevDistrict) => prevDistrict ? { ...prevDistrict, provinceid: Number(value) } : null);
    setUser((prevUser)=>prevUser?{...prevUser,provinceid:Number(selectedProvinceId)}:prevUser);
    helperService.getAllDropDown(token,'region',selectedProvinceId)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
  };

  const handleRegionChange = (selectedRegionId:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setUser((prevUser) => prevUser ? { ...prevUser, regionid: Number(selectedRegionId) } : prevUser);
    helperService.getAllDropDown(token,'district',selectedRegionId)
    .then((districtsData) => setDistricts(districtsData))
     .catch(error => console.error('There was an error fetching districts!', error));
  };

  const handleDistrictChange =(selectedDistrictId:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setUser((prevUser) => prevUser ? { ...prevUser, districtid: Number(selectedDistrictId) } : prevUser);
    helperService.getAllDropDown(token,'division',selectedDistrictId)
    .then((divisionData) => setDivisions(divisionData))
     .catch(error => console.error('There was an error fetching districts!', error));
  };

  const handleDivisionChange =(selectedDivisionId:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setUser((prevUser) => prevUser ? { ...prevUser, districtid: Number(selectedDivisionId) } : prevUser);
    helperService.getAllDropDown(token,'circle',selectedDivisionId)
    .then((divisionData) => setDivisions(divisionData))
     .catch(error => console.error('There was an error fetching districts!', error));
  };
  const handleCircleChange =(selectedcircleId:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setUser((prevUser) => prevUser ? { ...prevUser, circleid: Number(selectedcircleId) } : prevUser);
  };

  // const handlePoliceStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = e.target;
  //   setUser((prevUser) => prevUser ? { ...prevUser, policestationid: Number(value) } : prevUser);
  // };


  return (
    <div>
<div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit User
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      User Name
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                      placeholder="Enter your user name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Cell No
                    </label>
                    <input
                      type="text"
                      id="cellno"
                      name="cellno"
                      value={user.cellno}
                      onChange={handleInputChange}
                      placeholder="Enter your cell no"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Resource Name
                    </label>
                    <input
                      type="text"
                      id="resourcename"
                      name="resourcename"
                      value={user.resourcename}
                      onChange={handleInputChange}
                      placeholder="Enter your Resource Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                  <h3>Select Shift</h3>
                    
                    <div>
                      <label>
                        <input
                          type="radio"
                          id="MorningShiftId"
                          name="shiftid"
                          value="0"
                          checked={user.shiftid === 0}
                          onChange={handleInputChange}
                        />
                        Morning Shift
                      </label>
                    </div>
                    
                    <div>
                      <label>
                        <input
                          type="radio"
                          id="NightShiftId"
                          name="shiftid"
                          value="1"
                          checked={user.shiftid === 1}
                          onChange={handleInputChange}
                        />
                        Night Shift
                      </label>
                    </div>
                    {/* <label className="mb-2.5 block text-black dark:text-white">
                      Shift
                    </label>
                    <input
                      type="text"
                      id="shiftid"
                      name="shiftid"
                      value={user.shiftid}
                      onChange={handleInputChange}
                      placeholder="Enter your shift"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    /> */}
                  </div>

                  <div className="w-full xl:w-1/2">
                    {/* <label className="mb-2.5 block text-black dark:text-white">
                      Province
                    </label> */}
                    <DropDownList   
                    options={provinces}   
                    label="Province" 
                    selectedValue={user.provinceid ? String(user.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
                    {/* <input
                      type="text"
                      id="resourcename"
                      name="resourcename"
                      value={user.resourcename}
                      onChange={handleInputChange}
                      placeholder="Enter your Resource Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    /> */}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                    Region <span className="text-meta-1">*</span>
                  </label> */}
                  <DropDownList   
                    options={regions}   
                    label="Region" 
                    selectedValue={user.regionid ? String(user.regionid) : ''}  // Handle selected value   
                    onOptionChange={handleRegionChange}/>
                  {/* <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  /> */}
                </div>

                <div className="w-full xl:w-1/2">
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                    District
                  </label> */}
                  <DropDownList   
                    options={districts}   
                    label="District" 
                    selectedValue={user.districtid ? String(user.districtid) : ''}  // Handle selected value   
                    onOptionChange={handleDistrictChange}/>
                  {/* <input
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  /> */}
                </div>
                </div>
                {/* <SelectGroupOne /> */}

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                    Division
                  </label> */}
                  <DropDownList   
                    options={divisions}   
                    label="Division" 
                    selectedValue={user.divisionid ? String(user.divisionid) : ''}  // Handle selected value   
                    onOptionChange={handleDivisionChange}/>
                  {/* <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea> */}
                </div>

                <div className="w-full xl:w-1/2">
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                    Circle
                  </label> */}
                  <DropDownList   
                    options={circles}   
                    label="Circle" 
                    selectedValue={user.circleid ? String(user.circleid) : ''}  // Handle selected value   
                    onOptionChange={handleCircleChange}/>
                  
                </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>

      {/* <h2>Edit User</h2>
      {user && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="cellno">Cell No</label>
            <input
              type="text"
              id="cellno"
              name="cellno"
              value={user.cellno}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="resourcename">Resource Name</label>
            <input
              type="text"
              id="resourcename"
              name="resourcename"
              value={user.resourcename}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="shiftid">Shift</label>
            <input
              type="text"
              id="shiftid"
              name="shiftid"
              value={user.shiftid}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={user.provinceid ? String(user.provinceid) : '0'}
              //onChange={handleProvinceChange}
            >
              <option value="" disabled>Select a Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="region">Region</label>
            <select
              id="region"
              value={user.regionid ? String(user.regionid) : '0'}
              onChange={handleRegionChange}
            >
              <option value="" disabled>Select a Region</option>
              {regions.filter(region => region.provinceid === user.provinceid).map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="region">District</label>
            <select
              id="region"
              value={user.districtid ? String(user.districtid) : ''}
              onChange={handleDistrictChange}
            >
              <option value="" disabled>Select a District</option>
              {districts.filter(district => district.id === district.id).map((district) => (
                <option key={district.id} value={district.id}>
                  {district.districtname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="region">Division</label>
            <select
              id="region"
              value={user.divisionid ? String(user.divisionid) : '0'}
              onChange={handleDivisionChange}
            >
              <option value="" disabled>Select a Division</option>
              {divisions.filter(division => division.id === division.id).map((division) => (
                <option key={division.id} value={division.id}>
                  {division.divisionname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="circleid">Circle</label>
            <select
              id="circleid"
              value={user.circleid ? String(user.circleid) : ''}
              onChange={handleCircleChange}
            >
              <option value="" disabled>Select a Circle</option>
              {circles.filter(circle => circle.id === circle.id).map((circle) => (
                <option key={circle.id} value={circle.id}>
                  {circle.circlename}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label htmlFor="region">PoliceStation</label>
            <select
              id="region"
              value={user.policestationid ? String(user.policestationid) : ''}
              onChange={handlePoliceStationChange}
            >
              <option value="" disabled>Select a PoliceStation</option>
              {policestations.filter(policestation => policestation.id === policestation.id).map((policestation ) => (
                <option key={policestation.id} value={policestation.id}>
                  {policestation.psname}
                </option>
              ))}
            </select>
          </div> 
          <button type="submit">Update</button>
        </form>
      )} */}
    </div>
  );
};

export default EditUser;
