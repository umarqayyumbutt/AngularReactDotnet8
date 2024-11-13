import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState, AppDispatch } from '../../redux/Store/store';
// import userServices from '../../services/userServices';
// import { ProvinceData } from '../../types/ProvinceData';
import {useNavigate} from 'react-router-dom';
import { deleteProvince, fetchProvinces } from '../../redux/Slices/provinceSlice';
import DynamicList from '../../components/Tables/List';

const Provinces: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate();
  const { provinces} = useSelector((state: RootState) => state.provinces);
  //const[provinces,setProvinces]=useState<ProvinceData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  ///const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if(token){
      dispatch(fetchProvinces(token));
     // alert(provinces);
    }
    // userServices.getAllProvinces(token).then((response)=>{
    //     alert(JSON.stringify(response.data));
    //      setProvinces(response.data);
    //   });
    //dispatch(fetchProvinces());
  }, [dispatch,token]);

  const deleteItem = (id: number) => {
    // userServices.deleteProvince(token,id).then((response)=>{
    //   alert('Deleted successfully!');
    //   //alert(JSON.stringify(response.data));
    //    //setProvinces(response.data);
    // });
    if(token){
      dispatch(deleteProvince({id,token}));
    }
    //
  };
//***************UserHeader************************//
const headers = [
  { key: 'id', label: 'ID' },
  { key: 'provincename', label: 'Province Name' },
];
//***************UserHeader************************//
//****************Actions************* */

const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/province/edit-province/${id}`, // Navigate to edit page
  },
  {
    label: 'Delete',
    actionType: 'delete'  as const, // Delete action
    callback: deleteItem, // Trigger delete callback
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
        <h2 className='md-col col-md font-bold text-black'>Province List</h2>
        <div className='md-col-3 text-right'>
        <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/province/add-province`)}>Add Province</button>
        </div>
        
      </div>
      
     
       <DynamicList data={provinces} headers={headers} actions={actions}/>
      
      {/* { {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} }
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {provinces.map((province) => (
            <tr key={province.id}>
              <td>{province.id}</td>
              <td>{province.provincename}</td>
              <td>
                <button onClick={() => navigate(`edit-province/${province.id}`)}>Edit</button>
                <button onClick={() => handleDelete(province.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Provinces;
