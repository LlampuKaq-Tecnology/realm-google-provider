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
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useMessage, useT } from "cllk";
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
function RealmGoogleButton({ appId }) {
    const app = useApp();
    const { setUserRealm } = useSetUserRealm();
    const { login, createUserData } = useAuth();
    const { messagePromise, message } = useMessage();
    const { t } = useT();
    return (_jsx(GoogleOAuthProvider, { clientId: appId, children: _jsx(GoogleLogin, { type: "icon", shape: "circle", cancel_on_tap_outside: true, theme: "filled_blue", onSuccess: (response) => __awaiter(this, void 0, void 0, function* () {
                messagePromise(() => __awaiter(this, void 0, void 0, function* () {
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
                }), {
                    error: t("Error al iniciar sesión.", "Error logging in."),
                    pending: t("Iniciando sesión...", "Logging in..."),
                    success: t("Inicio de sesión exitoso.", "Login successful."),
                });
            }), onError: () => {
                message({
                    type: "error",
                    description: t("Ha ocurrido un error al iniciar sesión.", "An error occurred while logging in."),
                });
            } }) }));
}
export default RealmGoogleButton;
