export const checkSessionExpiry = (loginTime: number | null): boolean => {
    if (!loginTime) return false;
  
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - loginTime;
  
    // Check if 1 hour (3600000 ms) has passed
    return timeElapsed > 3600000;
  };