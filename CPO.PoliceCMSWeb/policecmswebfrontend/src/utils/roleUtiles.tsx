export const hasRequiredRoles = (userroles:  string[], requiredRoles: string[]) => {    
    //const userRos = ;
    return requiredRoles.some(role => userroles.includes(role));
  };