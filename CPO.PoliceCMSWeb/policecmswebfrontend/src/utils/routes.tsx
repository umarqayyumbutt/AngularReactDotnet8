import  { lazy,Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import AuthorizedRoute from '../authorization/AuthorizedRoute';
import FormElements from '../pages/Form/FormElements';

// Lazy load components for code splitting (optional)
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));

const Users = lazy(() => import('../pages/User/Users'));
const  Roles= lazy(() => import('../pages/User/Roles'));
const Provinces = lazy(() => import('../pages/Province/Provinces'));
const Regions = lazy(() => import('../pages/Region/Regions'));
const  Districts= lazy(() => import('../pages/District/Districts'));
const  Divisions= lazy(() => import('../pages/Division/Divisions'));
const  Circles= lazy(() => import('../pages/Circle/Circles'));
const  PoliceStations= lazy(() => import('../pages/PoliceStation/PoliceStations'));
const  Beats= lazy(() => import('../pages/Beat/Beats'));

const EditUser = lazy(() => import('../pages/User/EditUser'));
const EditRole = lazy(() => import('../pages/User/EditRole'));
const  EditProvince= lazy(() => import('../pages/Province/EditProvince'));
const  EditRegion= lazy(() => import('../pages/Region/EditRegion'));
const  EditDistrict= lazy(() => import('../pages/District/EditDistrict'));
const  EditDivision= lazy(() => import('../pages/Division/EditDivision'));
const  EditCircle= lazy(() => import('../pages/Circle/EditCircle'));
const  EditPoliceStation= lazy(() => import('../pages/PoliceStation/EditPoliceStation'));
const  EditBeat= lazy(() => import('../pages/Beat/EditBeat'));

const Register = lazy(() => import('../pages/Authentication/Register'));
const  Role= lazy(() => import('../pages/User/Role'));
const  Province= lazy(() => import('../pages/Province/Province'));
const  Region= lazy(() => import('../pages/Region/Region'));
const  District= lazy(() => import('../pages/District/District'));
const  Division= lazy(() => import('../pages/Division/Division'));
const  Circle= lazy(() => import('../pages/Circle/Circle'));
const  PoliceStation= lazy(() => import('../pages/PoliceStation/PoliceStation'));
const  Beat= lazy(() => import('../pages/Beat/Beat'));

// Define routes as an array of objects
const routes: RouteObject[] = [
    {
        path: '/auth/signin',
        element:(
            <>
              <PageTitle title="Signin | User Management System" />
              <SignIn />
            </>
          )
  },
  {
    path:"/forms/form-elements",
    element:(
      <>
        <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <FormElements />
      </>
    )
},
  {
    path: '/user/users',
    element:(<><PageTitle title="User | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Users} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/user/roles',
    element: (<><PageTitle title="Role | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Roles} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/province/provinces',
    element: (<><PageTitle title="Province | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Provinces} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/region/regions',
    element: (<><PageTitle title="Region | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Regions} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/district/districts',
    element: (<><PageTitle title="District | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Districts} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/division/divisions',
    element: (<><PageTitle title="Division | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Divisions} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/circle/circles',
    element: (<><PageTitle title="Circle | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Circles} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/policestation/policestations',
    element: (<><PageTitle title="PoliceStation | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={PoliceStations} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/beat/beats',
    element: (<><PageTitle title="Beats | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Beats} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/user/edit-user/:id',
    element: (<><PageTitle title="User | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditUser} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/user/edit-role/:id',
    element: (<><PageTitle title="Role | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditRole} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/province/edit-province/:id',
    element: (<><PageTitle title="Province | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditProvince} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/region/edit-region/:id',
    element: (<><PageTitle title="Region | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditRegion} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/district/edit-district/:id',
    element: (<><PageTitle title="District | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditDistrict} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/division/edit-division/:id',
    element: (<><PageTitle title="Division | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditDivision} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/circle/edit-circle/:id',
    element: (<><PageTitle title="Circle | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditCircle} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/policestation/edit-policestation/:id',
    element: (<><PageTitle title="PoliceStation | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditPoliceStation} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/beat/edit-beat/:id',
    element: (<><PageTitle title="Beats | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={EditBeat} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/auth/signup',
    element: (<><PageTitle title="Register | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Register} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/user/add-role',
    element: (<><PageTitle title="Role | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Role} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/province/add-province',
    element: (<><PageTitle title="Province | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Province} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/region/add-region',
    element: (<><PageTitle title="Region | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Region} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/district/add-district',
    element: (<><PageTitle title="District | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={District} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/division/add-division',
    element: (<><PageTitle title="Division | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Division} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/circle/add-circle',
    element: (<><PageTitle title="Circle | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Circle} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/policestation/add-policestation',
    element: (<><PageTitle title="PoliceStation | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={PoliceStation} requiredRoles={['1']} /></Suspense></>),
  },
  {
    path: '/beat/add-beat',
    element: (<><PageTitle title="Beats | User Management System" /><Suspense fallback={<div>Loading...</div>}><AuthorizedRoute component={Beat} requiredRoles={['1']} /></Suspense></>),
  },{
    path: '*',
    element:(
        <>
          <PageTitle title="Signin | User Management System" />
          <SignIn />
        </>
      )
},
  // Add more routes as needed
];

export default routes;