import React,{useState,useEffect} from 'react';
import authServices from '../../services/authServices';
import { ProvinceData } from '../../types/ProvinceData';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store/store';
import { useNavigate } from 'react-router-dom';
const Province: React.FC=()=>{
//   const token = useSelector((state: RootState) => state.auth.token);
// const user = useSelector((state: RootState) => state.auth.user);
const token = useSelector((state: RootState) => state.auth.token);
const user = useSelector((state: RootState) => state.auth.user);
  //const user = JSON.parse(localStorage.getItem('user')|| '{}');
const[province,setProvince]=useState<ProvinceData>({id:0,provincename:'',createdby:0});
const navigate = useNavigate();


const handleProvince = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //alert(province);
      province.createdby=user?.id??0;
      await authServices.addProvince(province,token|| '');
      alert('Province saved successfully!');
      navigate('/province/provinces')
    } catch (error) {
      alert('failed!');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProvince({ ...province, [name]: value });
  };
  useEffect(() => {
    //alert(user?.provinceId);
    //console.log();
    //alert(JSON.parse(localStorage.getItem('user')|| '{}').provinceId);
    // This is just a mock example. Replace this with actual data fetching logic.
    const loadProvinceForEdit = () => {
      //alert(user.provinceId);
      const provinceData: ProvinceData = { id: 0, provincename: '',createdby:0 };
     
      setProvince(provinceData);
    };
    loadProvinceForEdit();
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
              Add Province
              </h3>
            </div>
            <form onSubmit={handleProvince}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Province Name
                    </label>
                    <input
                      type="text"
                      id="provincename"
                      name="provincename"
                      value={province.provincename}
                      onChange={handleChange}
                      placeholder="Enter your user name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>                
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      {/* <h2>Province</h2>
      <form onSubmit={handleProvince}>
        
        <div>
          <label>Province</label>
          <input id="provincename"
          name="provincename" type="text" value={province.provincename} onChange={handleChange} required />
        </div>        
        
        <button type="submit">Save</button>
      </form> */}
    </div>
  );
};

export default Province;
