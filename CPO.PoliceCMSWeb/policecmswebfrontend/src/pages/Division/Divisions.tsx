import React, { useEffect,useState } from 'react';
import {  useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState } from '../../redux/Store/store';
import userServices from '../../services/userServices';
//import { RegionData } from '../../types/RegionData';
import { DivisionData } from '../../types/DivisionData';
import {useNavigate} from 'react-router-dom';
import DynamicList from '../../components/Tables/List';

const Divisions: React.FC = () => {
 // const dispatch = useDispatch<AppDispatch>();
  //const { provinces, loading, error } = useSelector((state: RootState) => state.provinces);
  const[divisions,setDivisions]=useState<DivisionData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  ///const user = useSelector((state: RootState) => state.auth.user);

  const navigate=useNavigate();

  useEffect(() => {
    userServices.getAllDivisions(token,'-1').then((response)=>{
        alert(JSON.stringify(response.data));
        setDivisions(response.data);
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
  { key: 'divisionname', label: 'Division Name' },
  { key: 'divisionurduname', label: 'Division Urdu Name' },
];
//***************UserHeader************************//
//****************Actions************* */

const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/division/edit-division/${id}`, // Navigate to edit page
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
      <h2 className='md-col col-md font-bold text-black'>Division List</h2>
      <div className='md-col-3 text-right'>
      <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/division/add-division`)}>Add Division</button>
      </div>
      
    </div>
      <DynamicList data={divisions} headers={headers} actions={actions}/>
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Urdu Name</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {divisions.map((division) => (
            <tr key={division.id}>
              <td>{division.id}</td>
              <td>{division.divisionname}</td>
              <td>{division.divisionurduname}</td>
              <td>
                <button onClick={() =>navigate(`edit-division/${division.id}`)}>Edit</button>
                <button onClick={() => handleDelete(division.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Divisions;
