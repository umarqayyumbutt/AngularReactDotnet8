import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState} from '../../redux/Store/store';
//import { updateProvince, fetchProvinces } from '../../features/province/provinceSlice';
import userService from '../../services/userServices';
import { RoleData } from '../../types/RoleData';
const EditRole: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [role, setRole] = useState<RoleData>({id:0,rolename:'',createdby:0});
  //const [name, setName] = useState('');

  useEffect(() => {
    if (token && id) {
     
       userService.getRoleById(id, token)
        .then((RoleData) => setRole(RoleData))
        .catch(error => console.error('There was an error fetching the district!', error));
        // console.log(district.provinceid.toString());
     
    }
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRole((prevRole) => prevRole ? { ...prevRole, [name]: value } : prevRole);
  };

  const handleUpdate = async() => {
    if (token && role) {
      try {
        await userService.updateRole(role, token);
        navigate('/roles');
      } catch (error) {
        console.error('There was an error updating the district!', error);
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit Role
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Role Name
                    </label>
                    <input
                      type="text"
                      id="rolename"
                      name="rolename"
                      value={role.rolename}
                      onChange={handleInputChange}
                      placeholder="Enter your user name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>                
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      {/* <h2>Edit Role</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <div>
          <label htmlFor="rolename">Name</label>
          <input
           type="text"
           id="rolename"
           name="rolename"
           value={role.rolename}
           onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form> */}
    </div>
  );
};

export default EditRole;
