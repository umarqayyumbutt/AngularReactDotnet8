import React,{useState,useEffect} from 'react';
// import authServices from '../../services/authServices';
import userServices from '../../services/userServices';
import { RegionData } from '../../types/RegionData';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store/store';
//import { ProvinceData } from '../../types/ProvinceData';
import {useNavigate} from 'react-router-dom';
import DropDownList from '../../components/Forms/DropDownList';
import { DropDownData } from '../../types/DropDownData';
import helperServices from '../../services/helperServices';

// interface Province {
//     id: number;
//     provincename: string;
//   }
const Region: React.FC=()=>{
//   const token = useSelector((state: RootState) => state.auth.token);
// const user = useSelector((state: RootState) => state.auth.user);
const token = useSelector((state: RootState) => state.auth.token);
const user = useSelector((state: RootState) => state.auth.user);
  //const user = JSON.parse(localStorage.getItem('user')|| '{}');
const[region,setRegion]=useState<RegionData>({id:0,name:'',provinceid:-1,provincename:'',createdby:0});
const [provinces, setProvinces] = useState<DropDownData[]>([]);
//const [selectedProvince, setSelectedProvince] = useState<string>('1');
const navigate=useNavigate();

const handleRegion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //region.provinceid=Number(selectedProvince);
      region.createdby=user?.id??0;
      await userServices.saveRegion(region,token|| '');
      alert('Region saved successfully!');
      navigate('region/regions');
    } catch (error) {
      alert('failed!');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegion({ ...region, [name]: value });
  };
  const handleProvinceChange =(id:string)=>{ //(event: ChangeEvent<HTMLSelectElement>) => {
    console.log(id);
    setRegion({ ...region, ['provinceid']: Number(id) });
    // setSelectedProvince(id); // Update selected province
    // alert(selectedProvince);
  };
  useEffect(() => {
//alert("here");
    helperServices.getAllDropDown(token,'province','0').then((response)=>{
        //alert(JSON.stringify(response));
         setProvinces(response);
      });
     // alert("here");
    //console.log();
    //alert(JSON.parse(localStorage.getItem('user')|| '{}').provinceId);
    // This is just a mock example. Replace this with actual data fetching logic.
    // const loadRegionForEdit = () => {
    //   //alert(user.provinceId);
    //   const regionData: RegionData = { Id: 0, Name: '',ProvinceId:0,CreatedBy:1 };
     
    //   setRegion(regionData);
    // };
    // loadRegionForEdit();
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
              Add Region
              </h3>
            </div>
      <form onSubmit={handleRegion}>

      <div className="p-6.5">
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">Region</label>
          <input id="name"
          name="name" type="text" value={region.name} onChange={handleChange} 
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          required/>
        </div>        
        <div className="w-full xl:w-1/2">
          <DropDownList   
                    options={provinces}   
                    label="Province" 
                    selectedValue={region?.provinceid ? String(region.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleProvinceChange}/>
            {/* <select value={selectedProvince} onChange={handleProvinceChange}>     
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
            {province.provincename}
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

export default Region;
