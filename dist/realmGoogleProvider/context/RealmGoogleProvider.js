import { jsx as _jsx } from "react/jsx-runtime";
import { GoogleOAuthProvider } from "@react-oauth/google";
function RealmGoogleProvider({ clientId, children, }) {
    return (_jsx(GoogleOAuthProvider, { clientId: clientId, children: children }));
}
export default RealmGoogleProvider;
