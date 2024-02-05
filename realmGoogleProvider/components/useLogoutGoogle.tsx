import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import { useAuth } from "@llampukaq/realm";
import { googleLogout } from "@react-oauth/google";
function useLogoutGoogle() {
  const { logout } = useAuth();
  return {
    logout: async () => {
      logout?.();
      googleLogout?.();
      FacebookLoginClient?.logout(() => {});
    },
  };
}

export default useLogoutGoogle;
