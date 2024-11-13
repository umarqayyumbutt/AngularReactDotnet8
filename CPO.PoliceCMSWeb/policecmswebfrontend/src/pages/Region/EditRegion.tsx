// // EditRegion.tsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { RootState, AppDispatch } from '../../app/store';
// import { fetchProvinces } from '../../features/province/provinceSlice';
// import userService from '../../services/userServices';
// import { ProvinceData } from '../../types/ProvinceData';
// import { RegionData } from '../../types/RegionData';

// const EditRegion: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const provinces = useSelector((state: RootState) => state.provinces.provinces);
//   const token = useSelector((state: RootState) => state.auth.token);
//   const [region, setRegion] = useState<RegionData | null>(null);
//   const [provinceId, setProvinceId] = useState<Number | string>('0');
//   const [regionName, setRegionName] = useState('');

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchProvinces(token));
//       if (id) {
//          userService.getRegionById(id, token)
//             .then((regionData) => {
//               setRegion(regionData);
//               //alert(regionData);
//               setRegionName(regionData.name);
//              // setProvinceId(regionData.ProvinceId);
//             })
//             .catch(error => {
//               console.error('There was an error fetching the region!', error);
//             });
//         }
//     }
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (token) {
//         // dispatch(fetchProvinces(token));
//         // if (id) {
//         //  userService.getRegionById(id, token)
//         //     .then((regionData) => {
//         //       setRegion(regionData);
//         //       //alert(regionData);
//         //       setRegionName(regionData.name);
//         //       setProvinceId(regionData.ProvinceId);
//         //     })
//         //     .catch(error => {
//         //       console.error('There was an error fetching the region!', error);
//         //     });
//         // }
//       }
//   }, [token, id,provinceId]);

//   const handleUpdate = async () => {
//     if (token && region) {
//       try {
//        // const updatedRegion = { name: regionName, provinceId };
//         alert(region.name);
//         region.name=regionName
//         await userService.updateRegion(region.id, region, token);
//         navigate('/regions');
//       } catch (error) {
//         console.error('There was an error updating the region!', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Region</h2>
//       <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
//         <div>
//           <label htmlFor="province">Province</label>
//           <select
//             id="province"
//             value={provinceId?.toString() || ''}
//             onChange={(e) => setProvinceId(Number(e.target.value))}
//           >
//             <option value="" disabled>Select Province</option>
//             {provinces.map((province: ProvinceData) => (
//               <option key={province.id} value={province.id}>{province.provincename}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label htmlFor="name">Region Name</label>
//           <input
//             type="text"
//             id="regionName"
//             value={regionName}
//             onChange={(e) => setRegionName(e.target.value)}
//           />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditRegion;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/Store/store';
import userServices from '../../services/userServices';
import { RegionData } from '../../types/RegionData';
//import { ProvinceData } from '../../types/ProvinceData';
import DropDownList from '../../components/Forms/DropDownList';
import { DropDownData } from '../../types/DropDownData';
import helperServices from '../../services/helperServices';

const EditRegion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [region, setRegion] = useState<RegionData | null>(null);
  const [provinces, setProvinces] = useState<DropDownData[]>([]);

  useEffect(() => {
    if (token) {
      helperServices.getAllDropDown(token,'province','0')
        .then((provincesData) => setProvinces(provincesData))
        .catch(error => console.error('There was an error fetching provinces!', error));
        console.log(provinces);
    }
  }, [token]);

  useEffect(() => {
    if (token && id) {
      userServices.getRegionById(id, token)
        .then((regionData) => setRegion(regionData))
        .catch(error => console.error('There was an error fetching the region!', error));
    }
  }, [token, id]);

  const handleUpdate = async () => {
    if (token && region) {
      try {
        await userServices.updateRegion(region, token);
        navigate('/region/regions');
      } catch (error) {
        console.error('There was an error updating the region!', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegion((prevRegion) => prevRegion ? { ...prevRegion, [name]: value } : null);
  };

  const handleSelectChange =(id:string)=>{ //(e: React.ChangeEvent<HTMLSelectElement>) => {
    //const { value } = e.target;
    setRegion((prevRegion) => prevRegion ? { ...prevRegion, provinceid: Number(id) } : null);
  };

  return (
    
    <div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit Region
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
                      id="name"
                      name="name"
                      value={region?.name}
                      onChange={handleInputChange}
                      placeholder="Enter your user name"
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
                    selectedValue={region?.provinceid ? String(region.provinceid) : ''}  // Handle selected value   
                    onOptionChange={handleSelectChange}/>
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

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      {/* <h2>Edit Region</h2>
      {region && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div>
            <label htmlFor="name">Region Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={region.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={region.provinceid ? String(region.provinceid) : ''}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select a Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.provincename}
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

export default EditRegion;
