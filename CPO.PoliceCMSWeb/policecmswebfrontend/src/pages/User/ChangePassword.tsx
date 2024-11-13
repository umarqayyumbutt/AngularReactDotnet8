import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../app/store';
import { updateProvince, fetchProvinces } from '../../features/province/provinceSlice';
import userService from '../../services/userServices';
import { ChangePasswordData } from '../../types/ChangePasswordData';
import { UserData } from '../../types/UserData';
const ChangePassword: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [password, setPassword] = useState<ChangePasswordData>({username:"",currentpassword:"",newpassword:""});
  const [user, setUser] = useState<UserData>({id:0,username:'',email:'',resourcename:'',cellno:'',shiftid:0,provinceid:0,regionid:0,districtid:0,divisionid:0,circleid:0,beatid:0});

  useEffect(() => {
    let isCancelled = false; // Flag to prevent effect running multiple times
    if (token && id) {
      userService.getUserById(Number(id), token)
      .then((userData) => {
        if (!isCancelled) {
          setUser(userData);
        }
      })
      .catch(error => console.error('There was an error fetching the User!', error));
      //password.username=user.username;
     // console.log(user.username);

      //  setPassword((prevPassword) => prevPassword ? { ...prevPassword, ['username']: user.username } : prevPassword);
      //  console.log(password);

  }
  return () => {
    isCancelled = true; // Clean up to prevent setState if the component unmounts
  };
}, [token,id]);
useEffect(() => {
  if (user.username) {
    setPassword((prevPassword) => ({
      ...prevPassword,
      username: user.username
    }));
  }
}, [user]);

  const handleUpdate = async() => {
    if (token ) {
      try {
        await userService.updatePassword( password, token);
        navigate('/roles');
      } catch (error) {
        console.error('There was an error updating the district!', error);
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => prevPassword ? { ...prevPassword, [name]: value } : prevPassword);
  };
  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
           type="text"
           id="username"
           name="username"
           value={password.username}
           onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="username">Current Password</label>
          <input
           type="text"
           id="currentpassword"
           name="currentpassword"
           value={password.currentpassword}
           onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="username">New Password</label>
          <input
           type="text"
           id="newpassword"
           name="newpassword"
           value={password.newpassword}
           onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ChangePassword;
