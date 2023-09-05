import { useAuth } from "@llampukaq/realm";
import { googleLogout } from "@react-oauth/google";
function useLogoutGoogle() {
    const { logout: l } = useAuth();
    const logout = () => {
        googleLogout();
        l();
    };
    return {
        logout,
    };
}
export default useLogoutGoogle;
