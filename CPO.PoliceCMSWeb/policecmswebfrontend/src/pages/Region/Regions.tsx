import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState } from '../../redux/Store/store';
import userServices from '../../services/userServices';
import { RegionData } from '../../types/RegionData';
import {useNavigate} from 'react-router-dom';
import DynamicList from '../../components/Tables/List';

const Regions: React.FC = () => {
  //const dispatch = useDispatch<AppDispatch>();
  //const { provinces, loading, error } = useSelector((state: RootState) => state.provinces);
  const[regions,setRegions]=useState<RegionData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate=useNavigate();
  ///const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    userServices.getAllRegions(token,'-1').then((response)=>{
        alert(JSON.stringify(response.data));
         setRegions(response.data);
      });
    //dispatch(fetchProvinces());
  }, []);

  const handleDelete = (id: number) => {
    if(token){
      console.log(id);
      //dispatch(deleteProvince({id}));
    }
    //dispatch(deleteProvince(id));
  };
//***************UserHeader************************//
const headers = [
  { key: 'id', label: 'ID' },
  { key: 'provincename', label: 'Province Name' },
  { key: 'name', label: 'Region Name' },
];
//***************UserHeader************************//
//****************Actions************* */

const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/region/edit-region/${id}`, // Navigate to edit page
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
        <h2 className='md-col col-md font-bold text-black'>Region List</h2>
        <div className='md-col-3 text-right'>
        <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/region/add-region`)}>Add Region</button>
        </div>
        
      </div>
      <DynamicList data={regions} headers={headers} actions={actions}/>
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Province Name</th>
            <th>Name</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => (
            <tr key={region.id}>
              <td>{region.id}</td>
              <td>{region.provincename}</td>
              <td>{region.name}</td>
              <td>
                <button onClick={() => navigate(`edit-region/${region.id}`)}>Edit</button>
                <button onClick={() => handleDelete(region.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Regions;
