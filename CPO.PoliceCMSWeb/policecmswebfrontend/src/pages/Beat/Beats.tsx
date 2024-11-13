import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState } from '../../redux/Store/store';
import userServices from '../../services/userServices';
//import { RegionData } from '../../types/RegionData';
//import { DivisionData } from '../../types/DivisionData';
//import { PoliceStationData } from '../../types/PoliceStationData';
import { BeatData } from '../../types/BeatData';
import { useNavigate } from 'react-router-dom';
import DynamicList from '../../components/Tables/List';
const Beats: React.FC = () => {
 // const dispatch = useDispatch<AppDispatch>();
  //const { provinces, loading, error } = useSelector((state: RootState) => state.provinces);
  const[beats,setBeats]=useState<BeatData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate=useNavigate();
  ///const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    userServices.getAllBeats(token,'-1').then((response)=>{
       // alert(response);
        setBeats(response);
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
  { key: 'beatname', label: 'District Name' },
  { key: 'beatno', label: 'District Code' },
];
//***************UserHeader************************//
//****************Actions************* */

const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/beat/edit-beat/${id}`, // Navigate to edit page
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
      <h2 className='md-col col-md font-bold text-black'>Beat List</h2>
      <div className='md-col-3 text-right'>
      <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/beat/add-beat`)}>Add Beat</button>
      </div>
      
    </div>
      <DynamicList data={beats} headers={headers} actions={actions}/>
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Beat No</th>          
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {beats.map((beat) => (
            <tr key={beat.id}>
              <td>{beat.id}</td>
              <td>{beat.beatname}</td>
              <td>{beat.beatno}</td>
              <td>
                <button onClick={() => navigate(`edit-beat/${beat.id}`)}>Edit</button>
                <button onClick={() => handleDelete(beat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Beats;
