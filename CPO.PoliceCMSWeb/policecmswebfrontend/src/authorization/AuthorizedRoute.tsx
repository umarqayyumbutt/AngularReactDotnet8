// components/AuthorizedRoute.tsx
import React,{useState,useEffect,startTransition} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store/store';
import { hasRequiredRoles } from '../utils/roleUtiles';

interface AuthorizedRouteProps {
  component: React.ComponentType<any>;//React.FC;
  requiredRoles: string[];
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({ component: Component, requiredRoles }) => {
  const location = useLocation();
  const userRoles = useSelector((state: RootState) => state.auth.roles);
const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  //return isAuthenticated ?  <Component /> : <Navigate to="/login" />;


  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);


  useEffect(() => {
    startTransition(() => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      // Check if the user has the required roles
      const accessGranted = hasRequiredRoles(userRoles, requiredRoles);
      setHasAccess(accessGranted);
      setIsLoading(false);
    });
  }, [isAuthenticated, userRoles, requiredRoles]);

  if (isLoading) {
    // Render loading indicator while checking roles and authentication
    return <div>Loading...</div>; // Replace with your loading spinner if needed
  }
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" />;
  }
console.log(userRoles);
  return hasAccess?( //hasRequiredRoles(userRoles, requiredRoles) ? (
    <Component />
  ) : (
    <Navigate to="/unauthotized" state={{ from: location }} replace />
  );
};

export default AuthorizedRoute;
