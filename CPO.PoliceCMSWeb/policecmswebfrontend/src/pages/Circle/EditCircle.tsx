import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState} from '../../redux/Store/store';
import userService from '../../services/userServices';
// import { ProvinceData } from '../../types/ProvinceData';
// import { DistrictData } from '../../types/DistrictData';
// import { RegionData } from '../../types/RegionData';
// import { DivisionData } from '../../types/DivisionData';
import { CircleData } from '../../types/CircleData';
import DropDownList from '../../components/Forms/DropDownList';
import helperServices from '../../services/helperServices';
import { DropDownData } from '../../types/DropDownData';

const EditCircle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [circle, setCircle] = useState<CircleData>({id:0,circlename:'',abbr:'',circleurduname:'',provinceid:0,regionid:0,districtid:0,divisionid:0});
  const [divisions, setDivisions] = useState<DropDownData[]>([]);
  const [provinces, setProvinces] = useState<DropDownData[]>([]);
  const [regions, setRegions] = useState<DropDownData[]>([]);
  const [districts, setDistricts] = useState<DropDownData[]>([]);

  useEffect(() => {
    if (token && id) {
     //console.log(id);
     userService.getCircleById(id, token)
        .then((circleData) => setCircle (circleData))
        .catch(error => console.error('There was an error fetching the Circle!', error));
         
//console.log(circle);
       
        helperServices.getAllDropDown(token,'province','0')
      .then((provincesData) => setProvinces(provincesData))
      .catch(error => console.error('There was an error fetching provinces!', error));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
     
        var provinceid=circle.provinceid.toString();
      helperServices.getAllDropDown(token,'region',provinceid)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
console.log(regions);
    }
  }, [provinces]);

  useEffect(() => {
    if (token) {
     
        var regionid=circle.regionid.toString();
        helperServices.getAllDropDown(token,'district',regionid)
        .then((districtsData) => setDistricts(districtsData))
         .catch(error => console.error('There was an error fetching regions!', error));
  console.log(regions);
    }
  }, [regions]);

  useEffect(() => {
    if (token) {
     
        var districtid=circle.districtid.toString();
        helperServices.getAllDropDown(token,'division',districtid)
        .then((divisionData) => setDivisions(divisionData))
         .catch(error => console.error('There was an error fetching regions!', error));
  console.log(regions);
    }
  }, [districts]);

 

  const handleUpdate = async () => {
    if (token && districts) {
      try {
        await userService.updateCircle(circle, token);
        navigate('/circle/circles');
      } catch (error) {
        console.error('There was an error updating the district!', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCircle((prevCircle) => prevCircle ? { ...prevCircle, [name]: value } : prevCircle);
  };

  const handleProvinceChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    //setDistrict((prevDistrict) => prevDistrict ? { ...prevDistrict, provinceid: Number(value) } : null);
    setCircle((prevCircle)=>prevCircle?{...prevCircle,provinceid:Number(id)}:prevCircle);
    helperServices.getAllDropDown(token,'region',id)
    .then((regionsData) => setRegions(regionsData))
     .catch(error => console.error('There was an error fetching regions!', error));
    //var regions=userService.getAllRegionsByProvinceId(token,value);
    // alert(regions);
    //setRegions(regions);
  };

  const handleRegionChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setCircle((prevCircle) => prevCircle ? { ...prevCircle, regionid: Number(id) } : prevCircle);
    helperServices.getAllDropDown(token,'district',id)
    .then((districtsData) => setDistricts(districtsData))
     .catch(error => console.error('There was an error fetching regions!', error));
  };

  const handleDistrictChange = (id:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setCircle((prevCircle) => prevCircle ? { ...prevCircle, districtid: Number(id) } : prevCircle);
    helperServices.getAllDropDown(token,'division',id)
    .then((divisionData) => setDivisions(divisionData))
     .catch(error => console.error('There was an error fetching regions!', error));
  };

  const handleDivisionChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setCircle((prevCircle) => prevCircle ? { ...prevCircle, divisionid: Number(id) } : prevCircle);
  };


  return (
    <div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit Circle
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Circle Name
                    </label>
                    <input
                      type="text"
                      id="circlename"
                      name="circlename"
                      value={circle.circlename}
                      onChange={handleInputChange}
                      placeholder="Enter your circle name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Circle Urdu Name
                    </label>
                    <input
                      type="text"
                      id="circleurduname"
                      name="circleurduname"
                      value={circle.circleurduname}
                      onChange={handleInputChange}
                      placeholder="Enter your circle urdu name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                <div className="w-full xl:w-1/2">
                    {/* <label className="mb-2.5 block text-black dark:text-white">
                      Province
                    </label> */}
                    <DropDownList   
                    options={provinces}   
                    label="Province" 
                    selectedValue={circle?.provinceid ? String(circle.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
                  
                  </div>


                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={regions}   
                      label="Region" 
                      selectedValue={circle?.regionid ? String(circle.regionid) : ''}  // Handle selected value   
                      onOptionChange={handleRegionChange}/>                  
                    </div>

                    
               </div>
               <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

               <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={districts}   
                      label="District" 
                      selectedValue={circle?.districtid ? String(circle.districtid) : ''}  // Handle selected value   
                      onOptionChange={handleDistrictChange}/>                  
                    </div>

                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={divisions}   
                      label="Division" 
                      selectedValue={circle?.divisionid ? String(circle.divisionid) : ''}  // Handle selected value   
                      onOptionChange={handleDivisionChange}/>                  
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
      {/* <h2>Edit Circle</h2>
      {circle && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div>
            <label htmlFor="divisionname">Division Name</label>
            <input
              type="text"
              id="circlename"
              name="circlename"
              value={circle.circlename}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="circleurduname">Division Urdu Name</label>
            <input
              type="text"
              id="circleurduname"
              name="circleurduname"
              value={circle.circleurduname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={circle.provinceid ? String(circle.provinceid) : ''}
              onChange={handleProvinceChange}
            >
              <option value="" disabled>Select a Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.provincename}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="region">Region</label>
            <select
              id="region"
              value={circle.regionid ? String(circle.regionid) : ''}
              onChange={handleRegionChange}
            >
              <option value="" disabled>Select a Region</option>
              {regions.filter(region => region.provinceid === circle.provinceid).map((region) => (
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
              value={circle.districtid ? String(circle.districtid) : ''}
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
              value={circle.divisionid ? String(circle.divisionid) : ''}
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
          <button type="submit">Update</button>
        </form>
      )} */}
    </div>
  );
};

export default EditCircle;
