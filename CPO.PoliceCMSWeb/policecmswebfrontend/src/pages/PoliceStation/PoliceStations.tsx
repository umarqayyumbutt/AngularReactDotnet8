import React, { useEffect,useState } from 'react';
import {  useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState } from '../../redux/Store/store';
import userServices from '../../services/userServices';
//import { RegionData } from '../../types/RegionData';
//import { DivisionData } from '../../types/DivisionData';
import { PoliceStationData } from '../../types/PoliceStationData';
import { useNavigate } from 'react-router-dom';
import DynamicList from '../../components/Tables/List';
const PoliceStations: React.FC = () => {
 // const dispatch = useDispatch<AppDispatch>();
  //const { provinces, loading, error } = useSelector((state: RootState) => state.provinces);
  const[policestations,setPoliceStations]=useState<PoliceStationData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate=useNavigate();
  ///const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    userServices.getAllPoliceStations(token,'-1').then((response)=>{
        alert(JSON.stringify(response.data));
        setPoliceStations(response.data);
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
  { key: 'psname', label: 'PoliceStation Name' },
  { key: 'psurduname', label: 'PoliceStation Urdu Name' },
  { key: 'psabbr', label: 'PoliceStation Code' },
];
//***************UserHeader************************//
//****************Actions************* */

const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/policestation/edit-policestation/${id}`, // Navigate to edit page
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
      <h2 className='md-col col-md font-bold text-black'>PoliceStation List</h2>
      <div className='md-col-3 text-right'>
      <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/policestation/add-policestation`)}>Add PoliceStation</button>
      </div>
      
    </div>
      
      <DynamicList data={policestations} headers={headers} actions={actions}/>
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Urdu Name</th>
            <th>Abbr</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policestations.map((policestation) => (
            <tr key={policestation.id}>
              <td>{policestation.id}</td>
              <td>{policestation.psname}</td>
              <td>{policestation.psurduname}</td>
              <td>{policestation.psabbr}</td>
              <td>
                <button onClick={() => navigate(`edit-policestation/${policestation.id}`)}>Edit</button>
                <button onClick={() => handleDelete(policestation.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default PoliceStations;
