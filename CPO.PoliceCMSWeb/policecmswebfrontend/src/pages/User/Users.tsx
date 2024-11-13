import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
//import { fetchProvinces, deleteProvince } from './provinceSlice';
import { RootState } from '../../redux/Store/store';
import userServices from '../../services/userServices';
//import { RegionData } from '../../types/RegionData';
//import { DivisionData } from '../../types/DivisionData';
//import { PoliceStationData } from '../../types/PoliceStationData';
//import { BeatData } from '../../types/BeatData';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../types/UserData';
import DynamicList from '../../components/Tables/List';

const Users: React.FC = () => {
 // const dispatch = useDispatch<AppDispatch>();
  //const { provinces, loading, error } = useSelector((state: RootState) => state.provinces);
  
  const[users,setUsers]=useState<UserData[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate=useNavigate();
  ///const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    // userServices.getAllUsers(token).then((response)=>{
    //    // alert(response);
    //     setUsers(response);
    //   });
    if (token) {
        console.log('Token:', token); // Log the token to ensure it is present
        userServices.getAllUsers(token)
          .then((data) => setUsers(data))
          .catch((error) => console.error('There was an error fetching the users!', error));
      }
    //dispatch(fetchProvinces());
  }, [token]);

  // const handleDelete = (id: number) => {
  //   console.log(id);
  //   //dispatch(deleteProvince(id));
  // };

  //***************UserHeader************************//
  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'username', label: 'User Name' },
    { key: 'email', label: 'Email' },
    { key: 'resourcename', label: 'Resource Name' },
    { key: 'cellno', label: 'Cell No' },
  ];
  //***************UserHeader************************//
  const deleteItem = (id: number) => {
    console.log(`Delete item with ID: ${id}`);
    // Add delete logic here (e.g., API call)
  };
//****************Actions************* */
const actions = [
  {
    label: 'Edit',
    actionType: 'edit' as const, // Edit action
    navigateUrl: (id: number) => `/user/edit-user/${id}`, // Navigate to edit page
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
      <h2 className='md-col col-md font-bold text-black'>User List</h2>
      <div className='md-col-3 text-right'>
      <button className='rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90' onClick={() => navigate(`/auth/signup`)}>Add User</button>
      </div>
      
    </div>
       <DynamicList data={users} headers={headers} actions={actions}/>
      {/* <h2>User List</h2> */}
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>   
            <th>Resource Name</th>  
            <th>Cell No</th>         
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.resourcename}</td>
              <td>{user.cellno}</td>
              <td>
                <button onClick={() => navigate(`edit-user/${user.id}`)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button onClick={() => navigate(`change-password/${user.id}`)}>Change Password</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Users;
