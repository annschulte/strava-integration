import { useCallback } from "react";

export const useBeginStravaAuthentication = () => {
  const handOffToStravaAuth = useCallback(async () => {
    try {
      const { origin } = window;
      window.location.assign(
        `https://www.strava.com/oauth/authorize?client_id=76253&redirect_uri=${origin}/token&response_type=code&scope=activity:read_all`
      );
    } catch {
      console.log("error");
    }
  }, []);
  return { handOffToStravaAuth };
};
