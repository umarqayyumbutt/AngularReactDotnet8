import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, } from '../../redux/Store/store';
import userService from '../../services/userServices';
//import { ProvinceData } from '../../types/ProvinceData';
//import { DistrictData } from '../../types/DistrictData';
//import { RegionData } from '../../types/RegionData';
import { DivisionData } from '../../types/DivisionData';
import DropDownList from '../../components/Forms/DropDownList';
import { DropDownData } from '../../types/DropDownData';
import helperServices from '../../services/helperServices';

const EditDivision: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const [division, setDivision] = useState<DivisionData>({id:0,divisionname:'',abbr:'',divisionurduname:'',provinceid:0,regionid:0,districtid:0});;
  const [provinces, setProvinces] = useState<DropDownData[]>([]);
  const [regions, setRegions] = useState<DropDownData[]>([]);
  const [districts, setDistrict] = useState<DropDownData[]>([]);

  useEffect(() => {
    if (token && id) {
     //console.log(id);
       userService.getDivisionById(id, token)
        .then((divisionData) => setDivision (divisionData))
        .catch(error => console.error('There was an error fetching the division!', error));
         console.log(division.provinceid);
     
         helperServices.getAllDropDown(token,'province','0')
      .then((provincesData) => setProvinces(provincesData))
      .catch(error => console.error('There was an error fetching provinces!', error));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
     
        var provinceid=division.provinceid.toString();
      helperServices.getAllDropDown(token,'region',provinceid)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
console.log(regions);
    }
  }, [provinces]);

  useEffect(() => {
    if (token) {
     
        var regionid=division.regionid.toString();
        helperServices.getAllDropDown(token,'district',regionid)
        .then((districtsData) => setDistrict(districtsData))
         .catch(error => console.error('There was an error fetching regions!', error));
  console.log(regions);
    }
  }, [regions]);

 

  const handleUpdate = async () => {
    if (token && districts) {
      try {
        await userService.updateDivision(division, token);
        navigate('/division/divisions');
      } catch (error) {
        console.error('There was an error updating the district!', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDivision((prevDivision) => prevDivision ? { ...prevDivision, [name]: value } : prevDivision);
  };

  const handleProvinceChange = (id:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    //setDistrict((prevDistrict) => prevDistrict ? { ...prevDistrict, provinceid: Number(value) } : null);
    setDivision((prevDivision)=>prevDivision?{...prevDivision,provinceid:Number(id)}:prevDivision);
    helperServices.getAllDropDown(token,'region',id)
    .then((regionsData) => setRegions(regionsData))
     .catch(error => console.error('There was an error fetching regions!', error));
    //var regions=userService.getAllRegionsByProvinceId(token,value);
    // alert(regions);
    //setRegions(regions);
  };

  const handleRegionChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setDivision((prevDivision) => prevDivision ? { ...prevDivision, regionid: Number(id) } : prevDivision);
    helperServices.getAllDropDown(token,'district',id)
        .then((districtsData) => setDistrict(districtsData))
         .catch(error => console.error('There was an error fetching regions!', error));
  };

  const handleDistrictChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setDivision((prevDivision) => prevDivision ? { ...prevDivision, districtid: Number(id) } : prevDivision);
  };

  return (
    <div>
       <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit Division
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Division Name
                    </label>
                    <input
                      type="text"
                      id="divisionname"
                      name="divisionname"
                      value={division.divisionname}
                      onChange={handleInputChange}
                      placeholder="Enter your district name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    {/* <label className="mb-2.5 block text-black dark:text-white">
                      Province
                    </label> */}
                    <DropDownList   
                    options={provinces}   
                    label="Province" 
                    selectedValue={division?.provinceid ? String(division.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
                  
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={regions}   
                      label="Region" 
                      selectedValue={division?.regionid ? String(division.regionid) : ''}  // Handle selected value   
                      onOptionChange={handleRegionChange}/>                  
                    </div>

                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={districts}   
                      label="District" 
                      selectedValue={division?.districtid ? String(division.districtid) : ''}  // Handle selected value   
                      onOptionChange={handleDistrictChange}/>                  
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
      {/* <h2>Edit Division</h2>
      {division && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div>
            <label htmlFor="divisionname">Division Name</label>
            <input
              type="text"
              id="divisionname"
              name="divisionname"
              value={division.divisionname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={division.provinceid ? String(division.provinceid) : ''}
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
              value={division.regionid ? String(division.regionid) : ''}
              onChange={handleRegionChange}
            >
              <option value="" disabled>Select a Region</option>
              {regions.filter(region => region.provinceid === division.provinceid).map((region) => (
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
              value={division.districtid ? String(division.districtid) : ''}
              onChange={handleDistrictChange}
            >
              <option value="" disabled>Select a District</option>
              {districts.filter(district => district.provinceid === district.provinceid).map((district) => (
                <option key={district.id} value={district.id}>
                  {district.districtname}
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

export default EditDivision;