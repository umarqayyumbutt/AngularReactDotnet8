import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState, AppDispatch } from '../../redux/Store/store';
import {useNavigate} from 'react-router-dom';
import { deleteProvince } from '../../redux/Slices/provinceSlice';
import userServices from '../../services/userServices';
import { RoleData } from '../../types/RoleData';
import DynamicList from '../../components/Tables/List';
const Roles: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate();
  const[roles,setRole]=useState<RoleData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    if(token){
        userServices.getAllRoles(token).then((response)=>{
            alert(JSON.stringify(response));
            setRole(response);
          });
        //dispatch(fetchProvinces());
      }
    }, [token]);

  const handleDelete = (id: number) => {
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
  { key: 'rolename', label: 'Role Name' },
];
//***************UserHeader************************//
//****************Actions************* */

const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/user/edit-role/${id}`, // Navigate to edit page
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
      <h2 className='md-col col-md font-bold text-black'>Role List</h2>
      <div className='md-col-3 text-right'>
      <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/user/add-role`)}>Add Role</button>
      </div>
      
    </div>
     <DynamicList data={roles} headers={headers} actions={actions}/>
     
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.rolename}</td>
              <td>
                <button onClick={() => navigate(`edit-role/${role.id}`)}>Edit</button>
                <button onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Roles;
