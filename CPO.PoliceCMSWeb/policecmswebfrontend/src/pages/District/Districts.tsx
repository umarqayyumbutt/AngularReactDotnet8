import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState } from '../../redux/Store/store';
import userServices from '../../services/userServices';

import { DistrictData } from '../../types/DistrictData';
import {useNavigate} from 'react-router-dom';
import DynamicList from '../../components/Tables/List';

const Districts: React.FC = () => {
 // const dispatch = useDispatch<AppDispatch>();
  //const { provinces, loading, error } = useSelector((state: RootState) => state.provinces);
  const[districts,setDistricts]=useState<DistrictData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate=useNavigate();
  ///const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    userServices.getAllDistricts(token,'-1').then((response)=>{
        alert(JSON.stringify(response.data));
        setDistricts(response.data);
      });
    //dispatch(fetchProvinces());
  }, []);

  const handleDelete = (id: number) => {
    console.log(id);
    //dispatch(deleteProvince(id));
  };
//***************UserHeader************************//
const headers = [
  { key: 'id', label: 'ID' },
  { key: 'districtname', label: 'District Name' },
  { key: 'districtcode', label: 'District Code' },
  { key: 'districturduname', label: 'District Urdu Name' },
];
//***************UserHeader************************//
//****************Actions************* */

const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/district/edit-district/${id}`, // Navigate to edit page
  },
  {
    label: 'Delete',
    actionType: 'delete'  as const, // Delete action
    callback: handleDelete, // Trigger delete callback
  },
  {
    label: 'View',
    actionType: 'view'  as const, // View action
    navigateUrl: (id: number) => `/view/${id}`, // Navigate to view page
  },
];
//****************Actions************* */
  return (
    <div className="content-container p-1 ">
      <div className='grid grid-cols-2  bg-white p-3 shadow'>
        <h2 className='md-col col-md font-bold text-black'>District List</h2>
        <div className='md-col-3 text-right'>
        <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/district/add-district`)}>Add District</button>
        </div>
        
      </div>
      <DynamicList data={districts} headers={headers} actions={actions}/>
      {/* { {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} }
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Urdu Name</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((district) => (
            <tr key={district.id}>
              <td>{district.id}</td>
              <td>{district.districtname}</td>
              <td>{district.districtcode}</td>
              <td>{district.districturduname}</td>
              <td>
                <button onClick={() => navigate(`edit-district/${district.id}`)}>Edit</button>
                <button onClick={() => handleDelete(district.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Districts;
