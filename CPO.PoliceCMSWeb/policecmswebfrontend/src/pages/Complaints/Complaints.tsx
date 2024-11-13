import React, { useEffect,useState } from 'react';
import {  useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState, } from '../../redux/Store/store';
import userServices from '../../services/userServices';
//import { RegionData } from '../../types/RegionData';
//import { DivisionData } from '../../types/DivisionData';
import { CircleData } from '../../types/CircleData';
import { useNavigate } from 'react-router-dom';
import DynamicList from '../../components/Tables/List';
const Complaints: React.FC = () => {
 // const dispatch = useDispatch<AppDispatch>();
  //const { provinces, loading, error } = useSelector((state: RootState) => state.provinces);
  const[complaints,setComplaints]=useState<CircleData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  ///const user = useSelector((state: RootState) => state.auth.user);
  const navigate=useNavigate();

  useEffect(() => {
    userServices.getAllCircles(token,'-1').then((response)=>{
        alert(JSON.stringify(response.data));
        setComplaints(response.data);
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
  { key: 'circlename', label: 'Circle Name' },
  { key: 'circleurduname', label: 'Circle Urdu Name' },
  { key: 'abbr', label: 'Circle Code' },
];
//***************UserHeader************************//
//****************Actions************* */

const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/circle/edit-circle/${id}`, // Navigate to edit page
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
      <h2 className='md-col col-md font-bold text-black'>Circle List</h2>
      <div className='md-col-3 text-right'>
      <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/circle/add-circle`)}>Add Circle</button>
      </div>
      
    </div>
     
      <DynamicList data={complaints} headers={headers} actions={actions}/>
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
          {circles.map((circle) => (
            <tr key={circle.id}>
              <td>{circle.id}</td>
              <td>{circle.circlename}</td>
              <td>{circle.circleurduname}</td>
              <td>{circle.abbr}</td>
              <td>
                <button onClick={() => navigate(`edit-circle/${circle.id}`)}>Edit</button>
                <button onClick={() => handleDelete(circle.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Complaints;
