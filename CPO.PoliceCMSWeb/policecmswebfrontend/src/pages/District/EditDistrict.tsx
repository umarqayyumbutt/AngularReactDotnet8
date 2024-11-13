import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/Store/store';
import userService from '../../services/userServices';
//import { ProvinceData } from '../../types/ProvinceData';
import { DistrictData } from '../../types/DistrictData';
//import { RegionData } from '../../types/RegionData';
import DropDownList from '../../components/Forms/DropDownList';
import { DropDownData } from '../../types/DropDownData';
import helperServices from '../../services/helperServices';

const EditDistrict: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [district, setDistrict] = useState<DistrictData>({id:0,districtname:'',districtcode:'',districturduname:'',provinceid:0,regionid:0});;
  const [provinces, setProvinces] = useState<DropDownData[]>([]);
  const [regions, setRegions] = useState<DropDownData[]>([]);

  useEffect(() => {
    if (token && id) {
     
       userService.getDistrictById(id, token)
        .then((districtData) => setDistrict(districtData))
        .catch(error => console.error('There was an error fetching the district!', error));
        // console.log(district.provinceid.toString());
     
        helperServices.getAllDropDown(token,'province','0')
      .then((provincesData) => setProvinces(provincesData))
      .catch(error => console.error('There was an error fetching provinces!', error));
     
    }
  }, [token]);

  useEffect(() => {
    if (token) {
     
    


      var provinceid=district.provinceid.toString();
      helperServices.getAllDropDown(token,'region',provinceid)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
console.log(regions);
       
    }
  }, [provinces]);

 

  const handleUpdate = async () => {
    if (token && district) {
      try {
        await userService.updateDistrict(district, token);
        navigate('/district/districts');
      } catch (error) {
        console.error('There was an error updating the district!', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDistrict((prevDistrict) => prevDistrict ? { ...prevDistrict, [name]: value } : prevDistrict);
  };

  const handleProvinceChange = (id:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {

    setDistrict((prevDistrict)=>prevDistrict?{...prevDistrict,provinceid:Number(id)}:prevDistrict);
    
    helperServices.getAllDropDown(token,'region',id)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
    //const { value } = e.target;
    //setDistrict((prevDistrict) => prevDistrict ? { ...prevDistrict, provinceid: Number(value) } : null);
    
    //var regions=userService.getAllRegionsByProvinceId(token,value);
    // alert(regions);
    //setRegions(regions);
  };

  const handleRegionChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setDistrict((prevDistrict) => prevDistrict ? { ...prevDistrict, regionid: Number(id) } : prevDistrict);
  };

  return (
    <div>
        <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit District
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
                      id="districtname"
                      name="districtname"
                      value={district.districtname}
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
                    selectedValue={district?.provinceid ? String(district.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
                  
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                <div className="w-full xl:w-1/2">
                    
                    <DropDownList   
                    options={regions}   
                    label="Region" 
                    selectedValue={district?.regionid ? String(district.regionid) : ''}  // Handle selected value   
                    onOptionChange={handleRegionChange}/>
                  
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
      {/* <h2>Edit District</h2>
      {district && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div>
            <label htmlFor="districtname">District Name</label>
            <input
              type="text"
              id="districtname"
              name="districtname"
              value={district.districtname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={district.provinceid ? String(district.provinceid) : ''}
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
              value={district.regionid ? String(district.regionid) : ''}
              onChange={handleRegionChange}
            >
              <option value="" disabled>Select a Region</option>
              {regions.filter(region => region.provinceid === district.provinceid).map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
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

export default EditDistrict;
