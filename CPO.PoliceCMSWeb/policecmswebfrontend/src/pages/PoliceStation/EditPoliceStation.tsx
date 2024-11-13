import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/Store/store';
import userService from '../../services/userServices';
// import { ProvinceData } from '../../types/ProvinceData';
// import { DistrictData } from '../../types/DistrictData';
// import { RegionData } from '../../types/RegionData';
// import { DivisionData } from '../../types/DivisionData';
// import { CircleData } from '../../types/CircleData';
import { PoliceStationData } from '../../types/PoliceStationData';
import DropDownList from '../../components/Forms/DropDownList';
import { DropDownData } from '../../types/DropDownData';
import helperServices from '../../services/helperServices';

const EditPoliceStation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [policestation, setPoliceStation] = useState<PoliceStationData>({id:0,psname:'',psabbr:'',psurduname:'',provinceid:0,regionid:0,districtid:0,divisionid:0,circleid:0});
  const [circles, setCircle] = useState<DropDownData[]>([]);
  const [divisions, setDivisions] = useState<DropDownData[]>([]);
  const [provinces, setProvinces] = useState<DropDownData[]>([]);
  const [regions, setRegions] = useState<DropDownData[]>([]);
  const [districts, setDistricts] = useState<DropDownData[]>([]);

  useEffect(() => {
    if (token && id) {
     //console.log(id);
     userService.getPoliceStationById(id, token)
        .then((policestationData) => setPoliceStation (policestationData))
        .catch(error => console.error('There was an error fetching the Circle!', error));
         
//console.log(circle);
       
        helperServices.getAllDropDown(token,'province','0')
      .then((provincesData) => setProvinces(provincesData))
      .catch(error => console.error('There was an error fetching provinces!', error));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
     
        var provinceid=policestation.provinceid.toString();
      helperServices.getAllDropDown(token,'region',provinceid)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
console.log(regions);
    }
  }, [provinces]);

  useEffect(() => {
    if (token) {
     
        var regionid=policestation.regionid.toString();
        helperServices.getAllDropDown(token,'district',regionid)
        .then((districtsData) => setDistricts(districtsData))
         .catch(error => console.error('There was an error fetching regions!', error));
  console.log(regions);
    }
  }, [regions]);

  useEffect(() => {
    if (token) {
     
        var districtid=policestation.districtid.toString();
        helperServices.getAllDropDown(token,'division',districtid)
        .then((divisionData) => setDivisions(divisionData))
         .catch(error => console.error('There was an error fetching regions!', error));
  console.log(regions);
    }
  }, [districts]);

  useEffect(() => {
    if (token) {
     
        var divisionid=policestation.divisionid.toString();
        helperServices.getAllDropDown(token,'circle',divisionid)
        .then((circleData) => setCircle(circleData))
         .catch(error => console.error('There was an error fetching regions!', error));
  console.log(regions);
    }
  }, [divisions]);

  const handleUpdate = async () => {
    if (token && districts) {
      try {
        await userService.updatePoliceStation(policestation.id, policestation, token);
        navigate('/policestation/policestations');
      } catch (error) {
        console.error('There was an error updating the district!', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPoliceStation((prevPoliceStation) => prevPoliceStation ? { ...prevPoliceStation, [name]: value } : prevPoliceStation);
  };

  const handleProvinceChange = (id:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    //setDistrict((prevDistrict) => prevDistrict ? { ...prevDistrict, provinceid: Number(value) } : null);
    setPoliceStation((prevPoliceStation)=>prevPoliceStation?{...prevPoliceStation,provinceid:Number(id)}:prevPoliceStation);
    helperServices.getAllDropDown(token,'region',id)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
    //var regions=userService.getAllRegionsByProvinceId(token,value);
    // alert(regions);
    //setRegions(regions);
  };

  const handleRegionChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setPoliceStation((prevPoliceStation) => prevPoliceStation ? { ...prevPoliceStation, regionid: Number(id) } : prevPoliceStation);
    helperServices.getAllDropDown(token,'district',id)
        .then((districtsData) => setDistricts(districtsData))
         .catch(error => console.error('There was an error fetching districts!', error));
  };

  const handleDistrictChange = (id:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setPoliceStation((prevPoliceStation) => prevPoliceStation ? { ...prevPoliceStation, districtid: Number(id) } : prevPoliceStation);
    helperServices.getAllDropDown(token,'division',id)
        .then((divisionData) => setDivisions(divisionData))
         .catch(error => console.error('There was an error fetching division!', error));
  };

  const handleDivisionChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setPoliceStation((prevPoliceStation) => prevPoliceStation ? { ...prevPoliceStation, divisionid: Number(id) } : prevPoliceStation);
    helperServices.getAllDropDown(token,'circle',id)
        .then((circleData) => setCircle(circleData))
         .catch(error => console.error('There was an error fetching regions!', error));
  };
  const handleCircleChange =(id:string)=>{ // (e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setPoliceStation((prevPoliceStation) => prevPoliceStation ? { ...prevPoliceStation, circleid: Number(id) } : prevPoliceStation);
  };


  return (
    <div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit PliceStation
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      PoliceStation Name
                    </label>
                    <input
                      type="text"
                      id="psname"
                      name="psname"
                      value={policestation.psname}
                      onChange={handleInputChange}
                      placeholder="Enter your policestation name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      PoliceStaion Urdu Name
                    </label>
                    <input
                      type="text"
                      id="psurduname"
                      name="psurduname"
                      value={policestation.psurduname}
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
                    selectedValue={policestation?.provinceid ? String(policestation.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
                  
                  </div>


                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={regions}   
                      label="Region" 
                      selectedValue={policestation?.regionid ? String(policestation.regionid) : ''}  // Handle selected value   
                      onOptionChange={handleRegionChange}/>                  
                    </div>

                    
               </div>
               <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

               <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={districts}   
                      label="District" 
                      selectedValue={policestation?.districtid ? String(policestation.districtid) : ''}  // Handle selected value   
                      onOptionChange={handleDistrictChange}/>                  
                    </div>

                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={divisions}   
                      label="Division" 
                      selectedValue={policestation?.divisionid ? String(policestation.divisionid) : ''}  // Handle selected value   
                      onOptionChange={handleDivisionChange}/>                  
                    </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

               <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={circles}   
                      label="Circle" 
                      selectedValue={policestation?.circleid ? String(policestation.circleid) : ''}  // Handle selected value   
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
       {/* <h2>Edit PoliceStation</h2>
     {policestation && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div>
            <label htmlFor="psname">PoliceStation Name</label>
            <input
              type="text"
              id="psname"
              name="psname"
              value={policestation.psname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="psurduname">PoliceStation Urdu Name</label>
            <input
              type="text"
              id="psurduname"
              name="psurduname"
              value={policestation.psurduname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="psabbr">PoliceStation Abbrivation</label>
            <input
              type="text"
              id="psabbr"
              name="psabbr"
              value={policestation.psabbr}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={policestation.provinceid ? String(policestation.provinceid) : '0'}
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
              value={policestation.regionid ? String(policestation.regionid) : '0'}
              onChange={handleRegionChange}
            >
              <option value="" disabled>Select a Region</option>
              {regions.filter(region => region.provinceid === policestation.provinceid).map((region) => (
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
              value={policestation.districtid ? String(policestation.districtid) : ''}
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
              value={policestation.divisionid ? String(policestation.divisionid) : '0'}
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
            <label htmlFor="region">Circle</label>
            <select
              id="region"
              value={policestation.circleid ? String(policestation.circleid) : ''}
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
          <button type="submit">Update</button>
        </form>
      )} */}
    </div>
  );
};

export default EditPoliceStation;
