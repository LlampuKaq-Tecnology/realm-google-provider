var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Credentials, useApp, useAuth, useSetUserRealm, } from "@llampukaq/realm";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
const googleData = {
    email: "",
    email_verified: true,
    family_name: "",
    given_name: "",
    locale: "",
    name: "",
    picture: "",
};
function RealmGoogleButton({ onError, onSuccess, }) {
    const app = useApp();
    const { setUserRealm } = useSetUserRealm();
    const { login, createUserData } = useAuth();
    return (_jsx(GoogleLogin, { text: "continue_with", onSuccess: (response) => __awaiter(this, void 0, void 0, function* () {
            const dataInformacion = jwtDecode(response.credential);
            const credentials = Credentials.google({
                idToken: response.credential,
            });
            const userRealm = yield app.logIn(credentials);
            const dataRealm = yield userRealm.functions.userUsers("create", dataInformacion.email, createUserData({
                email: dataInformacion.email,
                name: dataInformacion.name,
                picture: dataInformacion.picture,
            }));
            login(dataRealm);
            setUserRealm(userRealm);
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(dataRealm, userRealm);
        }), onError: () => {
            onError === null || onError === void 0 ? void 0 : onError();
        }, useOneTap: true }));
}
export default RealmGoogleButton;
