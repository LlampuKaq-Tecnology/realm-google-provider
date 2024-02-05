import {
  Credentials,
  useApp,
  useAuth,
  useSetUserRealm,
} from "@llampukaq/realm";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useMessage, useT } from "cllk";
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
function RealmGoogleButton<T>({ appId }: { appId: string }) {
  const app = useApp();
  const { setUserRealm } = useSetUserRealm();
  const { login, createUserData } = useAuth();
  const { messagePromise, message } = useMessage();
  const { t } = useT();
  return (
    <GoogleOAuthProvider clientId={appId}>
      <GoogleLogin
        type="icon"
        shape="circle"
        
        cancel_on_tap_outside
        theme="filled_blue"
        onSuccess={async (response) => {
          messagePromise(
            async () => {
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
            },
            {
              error: t("Error al iniciar sesión.", "Error logging in."),
              pending: t("Iniciando sesión...", "Logging in..."),
              success: t("Inicio de sesión exitoso.", "Login successful."),
            }
          );
        }}
        onError={() => {
          message({
            type: "error",
            description: t(
              "Ha ocurrido un error al iniciar sesión.",
              "An error occurred while logging in."
            ),
          });
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default RealmGoogleButton;
