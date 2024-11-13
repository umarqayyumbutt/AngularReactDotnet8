import { useEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { RootState} from '../src/redux/Store/store';

import Loader from './common/Loader';
// import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
//import SignUp from './pages/Authentication/SignUp';
// import Calendar from './pages/Calendar';
// import Chart from './pages/Chart';
// import ECommerce from './pages/Dashboard/ECommerce';
// import FormElements from './pages/Form/FormElements';
// import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Tables from './pages/Tables';
// import Alerts from './pages/UiElements/Alerts';
// import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
// import Users from './pages/User/Users';
// import EditUser from './pages/User/EditUser';
// import Regions from './pages/Region/Regions';
// import Provinces from './pages/Province/Provinces';
// import Districts from './pages/District/Districts';
// import Divisions from './pages/Division/Divisions';
// import Circles from './pages/Circle/Circles';
// import PoliceStations from './pages/PoliceStation/PoliceStations';
// import Beats from './pages/Beat/Beats';
// import EditProvince from './pages/Province/EditProvince';
// import EditRegion from './pages/Region/EditRegion';
// import EditDistrict from './pages/District/EditDistrict';
// import EditDivision from './pages/Division/EditDivision';
// import EditCircle from './pages/Circle/EditCircle';
// import EditPoliceStation from './pages/PoliceStation/EditPoliceStation';
// import EditBeat from './pages/Beat/EditBeat';
// import Roles from './pages/User/Roles';
// import EditRole from './pages/User/EditRole';
// import Province from './pages/Province/Province';
// import Region from './pages/Region/Region';
// import District from './pages/District/District';
// import Division from './pages/Division/Division';
// import Circle from './pages/Circle/Circle';
// import PoliceStation from './pages/PoliceStation/PoliceStation';
// import Beat from './pages/Beat/Beat';
// import Register from './pages/Authentication/Register';
// import AuthorizedRoute from './authorization/AuthorizedRoute';
// import Role from './pages/User/Role';
import { useSelector } from 'react-redux';
import { checkSessionExpiry } from './utils/checkSessionExpiry ';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/Store/store';
import { useNavigate } from 'react-router-dom';
import {logout } from './redux/Slices/authSlice';
import routes from '../src/utils/routes'; // Import the routes array

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { loginTime } = useSelector((state: RootState) => state.auth);

  const dispatch=useDispatch<AppDispatch>();
  const navigate=useNavigate();
  const routing = useRoutes(routes); // useRoutes will generate all routes from the array
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (loginTime) {
      const isExpired = checkSessionExpiry(loginTime);

      if (isExpired) {
        dispatch(logout());
        navigate('/auth/signin'); // Redirect to login page
      } else {
        // Set timeout to logout exactly after the remaining time
        const timeLeft = 3600000 - (new Date().getTime() - loginTime);
        const timer = setTimeout(() => {
          dispatch(logout());
          navigate('/auth/signin'); // Redirect to login
        }, timeLeft);

        // Cleanup timeout if the user logs out manually or component unmounts
        return () => clearTimeout(timer);
      }
    }
  }, [dispatch, loginTime, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      {routing}
      {/* <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | User Management System" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={<><PageTitle title="Register | User Management System" /><AuthorizedRoute component={Register} requiredRoles={['1']} /></>}
        />
        <Route
          path="/user/users"
          element={<><PageTitle title="User | User Management System" /><AuthorizedRoute component={Users} requiredRoles={['1']} /></>}
        />
        <Route
          path="/user/edit-user/:id"
          element={<><PageTitle title="User | User Management System" /><AuthorizedRoute component={EditUser} requiredRoles={['1']} /></>}
        />
        <Route
          path="/user/roles"
          element={<><PageTitle title="Role | User Management System" /><AuthorizedRoute component={Roles} requiredRoles={['1']} /></>}
        />
        <Route
          path="/user/edit-role/:id"
          element={<><PageTitle title="Role | User Management System" /><AuthorizedRoute component={EditRole} requiredRoles={['1']} /></>}
        />
        <Route
          path="/user/add-role"
          element={<><PageTitle title="Role | User Management System" /><AuthorizedRoute component={Role} requiredRoles={['1']} /></>}
        />
         <Route
          path="/province/provinces"
          element={<><PageTitle title="Province | User Management System" /><AuthorizedRoute component={Provinces} requiredRoles={['1']} /></>}
        />
        <Route
          path="/province/add-province"
          element={<><PageTitle title="Province | User Management System" /><AuthorizedRoute component={Province} requiredRoles={['1']} /></>}
        />
         <Route
          path="/province/edit-province/:id"
          element={<><PageTitle title="Province | User Management System" /><AuthorizedRoute component={EditProvince} requiredRoles={['1']} /></>}
        />
         <Route
          path="/region/regions"
          element={<><PageTitle title="Region | User Management System" /><AuthorizedRoute component={Regions} requiredRoles={['1']} /></>}
        />
        <Route
          path="/region/edit-region/:id"
          element={<><PageTitle title="Region | User Management System" /><AuthorizedRoute component={EditRegion} requiredRoles={['1']} /></>}
        />
        <Route
          path="/region/add-region"
          element={<><PageTitle title="Region | User Management System" /><AuthorizedRoute component={Region} requiredRoles={['1']} /></>}
        />
         <Route
          path="/district/districts"
          element={<><PageTitle title="District | User Management System" /><AuthorizedRoute component={Districts} requiredRoles={['1']} /></>}
        />
        <Route
          path="/district/edit-district/:id"
          element={<><PageTitle title="District | User Management System" /><AuthorizedRoute component={EditDistrict} requiredRoles={['1']} /></>}
        />
        <Route
          path="/district/add-district"
          element={<><PageTitle title="District | User Management System" /><AuthorizedRoute component={District} requiredRoles={['1']} /></>}
        />
         <Route
          path="/division/divisions"
          element={<><PageTitle title="Division | User Management System" /><AuthorizedRoute component={Divisions} requiredRoles={['1']} /></>}
        />
        <Route
          path="/division/edit-division/:id"
          element={<><PageTitle title="Division | User Management System" /><AuthorizedRoute component={EditDivision} requiredRoles={['1']} /></>}
        />
        <Route
          path="/division/add-division"
          element={<><PageTitle title="Division | User Management System" /><AuthorizedRoute component={Division} requiredRoles={['1']} /></>}
        />
         <Route
          path="/circle/circles"
          element={<><PageTitle title="Circle | User Management System" /><AuthorizedRoute component={Circles} requiredRoles={['1']} /></>}
          />
          <Route
          path="/circle/edit-circle/:id"
          element={<><PageTitle title="Circle | User Management System" /><AuthorizedRoute component={EditCircle} requiredRoles={['1']} /></>}
        />
        <Route
          path="/circle/add-circle"
          element={<><PageTitle title="Circle | User Management System" /><AuthorizedRoute component={Circle} requiredRoles={['1']} /></>}
        />
          <Route
          path="/policestation/policestations"
          element={<><PageTitle title="PoliceStation | User Management System" /><AuthorizedRoute component={PoliceStations} requiredRoles={['1']} /></>}
          />
          <Route
          path="/policestation/edit-policestation/:id"
          element={<><PageTitle title="PoliceStation | User Management System" /><AuthorizedRoute component={EditPoliceStation} requiredRoles={['1']} /></>}
        />
        <Route
          path="/policestation/add-policestation"
          element={<><PageTitle title="PoliceStation | User Management System" /><AuthorizedRoute component={PoliceStation} requiredRoles={['1']} /></>}
        />
          <Route
          path="/beat/beats"
          element={<><PageTitle title="Beats | User Management System" /><AuthorizedRoute component={Beats} requiredRoles={['1']} /></>}
        />
        <Route
          path="/beat/edit-beat/:id"
          element={<><PageTitle title="Beats | User Management System" /><AuthorizedRoute component={EditBeat} requiredRoles={['1']} /></>}
        />
        <Route
          path="/beat/add-beat"
          element={<><PageTitle title="Beats | User Management System" /><AuthorizedRoute component={Beat} requiredRoles={['1']} /></>}
          
        />
      </Routes> */}
    </DefaultLayout>
  );
}

export default App;
