import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState} from '../../redux/Store/store';
import userService from '../../services/userServices';
// import { ProvinceData } from '../../types/ProvinceData';
// import { DistrictData } from '../../types/DistrictData';
// import { RegionData } from '../../types/RegionData';
// import { DivisionData } from '../../types/DivisionData';
// import { CircleData } from '../../types/CircleData';
// import { PoliceStationData } from '../../types/PoliceStationData';
import { BeatData } from '../../types/BeatData';
import DropDownList from '../../components/Forms/DropDownList';
import { DropDownData } from '../../types/DropDownData';
import helperServices from '../../services/helperServices';

const EditBeat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [beat, setBeat] = useState<BeatData>({id:0,beatname:'',beatno:'',provinceid:0,regionid:0,districtid:0,divisionid:0,circleid:0,policestationid:0});
  const [policestations, setPoliceStations] = useState<DropDownData[]>([]);
  const [circles, setCircles] = useState<DropDownData[]>([]);
  const [divisions, setDivisions] = useState<DropDownData[]>([]);
  const [provinces, setProvinces] = useState<DropDownData[]>([]);
  const [regions, setRegions] = useState<DropDownData[]>([]);
  const [districts, setDistricts] = useState<DropDownData[]>([]);

  useEffect(() => {
    if (token && id) {
     //console.log(id);
     userService.getBeatById(id, token)
        .then((beatData) => setBeat (beatData))
        .catch(error => console.error('There was an error fetching the Beat!', error));
         
console.log(beat);
       
        helperServices.getAllDropDown(token,'province','0')
      .then((provincesData) => setProvinces(provincesData))
      .catch(error => console.error('There was an error fetching provinces!', error));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
     
        var provinceid=beat.provinceid.toString();
        helperServices.getAllDropDown(token,'region',provinceid)
      .then((regionsData) => setRegions(regionsData))
       .catch(error => console.error('There was an error fetching regions!', error));
//console.log(regions);
    }
  }, [provinces]);

  useEffect(() => {
    if (token) {
     
        var regionid=beat.regionid.toString();
        helperServices.getAllDropDown(token,'district',regionid)
        .then((districtsData) => setDistricts(districtsData))
         .catch(error => console.error('There was an error fetching district!', error));
  //console.log(regions);
    }
  }, [regions]);

  useEffect(() => {
    if (token) {
     
        var districtid=beat.districtid.toString();
        helperServices.getAllDropDown(token,'division',districtid)
        .then((divisionData) => setDivisions(divisionData))
         .catch(error => console.error('There was an error fetching division!', error));
  //console.log(districts);
    }
  }, [districts]);

  useEffect(() => {
    if (token) {
     
        var divisionid=beat.divisionid.toString();
        helperServices.getAllDropDown(token,'circle',divisionid)
        .then((circleData) => setCircles(circleData))
         .catch(error => console.error('There was an error fetching circle!', error));
  //console.log(regions);
    }
  }, [divisions]);
  useEffect(() => {
    if (token) {
     
        var circleid=beat.circleid.toString();
        helperServices.getAllDropDown(token,'policestation',circleid)
        .then((policestationData) => setPoliceStations(policestationData))
         .catch(error => console.error('There was an error fetching policestations!', error));
  //console.log(regions);
    }
  }, [circles]);
  const handleUpdate = async () => {
    if (token && districts) {
      try {
        await userService.updateBeat(beat, token);
        navigate('/beat/beats');
      } catch (error) {
        console.error('There was an error updating the district!', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBeat((prevBeat) => prevBeat ? { ...prevBeat, [name]: value } : prevBeat);
  };

  const handleProvinceChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    //setDistrict((prevDistrict) => prevDistrict ? { ...prevDistrict, provinceid: Number(value) } : null);
    setBeat((prevBeat)=>prevBeat?{...prevBeat,provinceid:Number(id)}:prevBeat);
    helperServices.getAllDropDown(token,'region',id)
    .then((regionsData) => setRegions(regionsData))
     .catch(error => console.error('There was an error fetching regions!', error));
    //var regions=userService.getAllRegionsByProvinceId(token,value);
    // alert(regions);
    //setRegions(regions);
  };

  const handleRegionChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setBeat((prevBeat) => prevBeat ? { ...prevBeat, regionid: Number(id) } : prevBeat);
    helperServices.getAllDropDown(token,'district',id)
        .then((districtsData) => setDistricts(districtsData))
         .catch(error => console.error('There was an error fetching district!', error));
  };

  const handleDistrictChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setBeat((prevBeat) => prevBeat ? { ...prevBeat, districtid: Number(id) } : prevBeat);
    helperServices.getAllDropDown(token,'division',id)
        .then((divisionData) => setDivisions(divisionData))
         .catch(error => console.error('There was an error fetching division!', error));
  };

  const handleDivisionChange = (id:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setBeat((prevBeat) => prevBeat ? { ...prevBeat, divisionid: Number(id) } : prevBeat);
    helperServices.getAllDropDown(token,'circle',id)
        .then((circleData) => setCircles(circleData))
         .catch(error => console.error('There was an error fetching circle!', error));
  };
  const handleCircleChange = (id:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setBeat((prevBeat) => prevBeat ? { ...prevBeat, circleid: Number(id) } : prevBeat);
    helperServices.getAllDropDown(token,'policestation',id)
        .then((policestationData) => setPoliceStations(policestationData))
         .catch(error => console.error('There was an error fetching policestations!', error));
  };

  const handlePoliceStationChange = (id:string)=>{//(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setBeat((prevBeat) => prevBeat ? { ...prevBeat, policestationid: Number(id) } : prevBeat);
  };


  return (
    <div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit Beat
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Beat Name
                    </label>
                    <input
                      type="text"
                      id="beatname"
                      name="beatname"
                      value={beat.beatname}
                      onChange={handleInputChange}
                      placeholder="Enter your beat name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Beat No
                    </label>
                    <input
                      type="text"
                      id="beatno"
                      name="beatno"
                      value={beat.beatno}
                      onChange={handleInputChange}
                      placeholder="Enter your beat no"
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
                    selectedValue={beat?.provinceid ? String(beat.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
                  
                  </div>


                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={regions}   
                      label="Region" 
                      selectedValue={beat?.regionid ? String(beat.regionid) : ''}  // Handle selected value   
                      onOptionChange={handleRegionChange}/>                  
                    </div>

                    
               </div>
               <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

               <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={districts}   
                      label="District" 
                      selectedValue={beat?.districtid ? String(beat.districtid) : ''}  // Handle selected value   
                      onOptionChange={handleDistrictChange}/>                  
                    </div>

                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={divisions}   
                      label="Division" 
                      selectedValue={beat?.divisionid ? String(beat.divisionid) : ''}  // Handle selected value   
                      onOptionChange={handleDivisionChange}/>                  
                    </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

               <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={circles}   
                      label="Circle" 
                      selectedValue={beat?.circleid ? String(beat.circleid) : ''}  // Handle selected value   
                      onOptionChange={handleCircleChange}/>                  
                    </div>

                    <div className="w-full xl:w-1/2">                    
                      <DropDownList   
                      options={policestations}   
                      label="PoliceStation" 
                      selectedValue={beat?.policestationid ? String(beat.policestationid) : ''}  // Handle selected value   
                      onOptionChange={handlePoliceStationChange}/>                  
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
      {beat && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div>
            <label htmlFor="beatname">PoliceStation Name</label>
            <input
              type="text"
              id="beatname"
              name="beatname"
              value={beat.beatname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="beatno">Beat No</label>
            <input
              type="text"
              id="beatno"
              name="beatno"
              value={beat.beatno}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={beat.provinceid ? String(beat.provinceid) : '0'}
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
              value={beat.regionid ? String(beat.regionid) : '0'}
              onChange={handleRegionChange}
            >
              <option value="" disabled>Select a Region</option>
              {regions.filter(region => region.provinceid === beat.provinceid).map((region) => (
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
              value={beat.districtid ? String(beat.districtid) : ''}
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
              value={beat.divisionid ? String(beat.divisionid) : '0'}
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
              value={beat.circleid ? String(beat.circleid) : ''}
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
          <div>
            <label htmlFor="region">PoliceStation</label>
            <select
              id="region"
              value={beat.policestationid ? String(beat.policestationid) : ''}
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

export default EditBeat;
