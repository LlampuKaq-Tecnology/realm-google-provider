import {
  Credentials,
  useApp,
  useAuth,
  useSetUserRealm,
} from "@llampukaq/realm";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import React from "react";
const googleData = {
  email: "",
  email_verified: true,
  family_name: "",
  given_name: "",
  locale: "",
  name: "",
  picture: "",
};
function RealmGoogleButton<T>({
  onError,
  onSuccess,
}: {
  onSuccess?: (user: T, userRealm: any) => void;
  onError?: any;
}) {
  const app = useApp();
  const { setUserRealm } = useSetUserRealm();
  const { login, createUserData } = useAuth();

  return (
    <GoogleLogin
      text="continue_with"
      onSuccess={async (response) => {
        const dataInformacion = jwtDecode(
          response.credential as string
        ) as typeof googleData;
        const credentials = Credentials.google({
          idToken: response.credential as string,
        });
        const userRealm = await app.logIn(credentials);
        const dataRealm = await userRealm.functions.userUsers(
          "create",
          dataInformacion.email,
          createUserData({
            email: dataInformacion.email,
            name: dataInformacion.name,
            picture: dataInformacion.picture,
          })
        );
        login(dataRealm);
        //@ts-ignore
        setUserRealm(userRealm);
        onSuccess?.(dataRealm, userRealm);
      }}
      onError={() => {
        onError?.();
      }}
      useOneTap
    />
  );
}

export default RealmGoogleButton;
