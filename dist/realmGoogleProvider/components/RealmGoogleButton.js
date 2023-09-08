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
import { nanoid } from "nanoid";
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
    const { login, customDataUser } = useAuth();
    function parseLanguageTag(languageTag) {
        const [language, country] = languageTag.split("-");
        return {
            country: country,
            language: language,
        };
    }
    const data = ({ email, picture, name }) => {
        return Object.assign(Object.assign({ userId: nanoid(11), created: new Date(), name,
            email,
            picture }, (customDataUser !== null && customDataUser !== void 0 ? customDataUser : {})), parseLanguageTag(navigator.language));
    };
    return (_jsx("div", { children: _jsx(GoogleLogin, { text: "continue_with", onSuccess: (response) => __awaiter(this, void 0, void 0, function* () {
                const dataInformacion = jwtDecode(response.credential);
                const credentials = Credentials.google({
                    idToken: response.credential,
                });
                const user = yield app.logIn(credentials);
                const w = data(dataInformacion);
                const dataRealm = yield user.functions.userUsers("create", dataInformacion.email, w);
                login(dataRealm);
                setUserRealm(user);
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(dataRealm, user);
            }), onError: () => {
                onError === null || onError === void 0 ? void 0 : onError();
            }, useOneTap: true }) }));
}
export default RealmGoogleButton;
