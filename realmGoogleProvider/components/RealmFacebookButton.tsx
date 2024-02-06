import FacebookLogin from "@greatsumini/react-facebook-login";
import {
  Credentials,
  useApp,
  useAuth,
  useSetUserRealm,
} from "@llampukaq/realm";
import { useMessage, useT } from "cllk";
import React, { ReactNode, useState } from "react";

function RealmFacebookButton({
  appId,
  children,
}: {
  appId: string;
  children?: ReactNode;
}) {
  const app = useApp();
  const { setUserRealm } = useSetUserRealm();
  const { login, createUserData } = useAuth();
  const { messagePromise, message } = useMessage();
  const { t } = useT();
  const [s, setS] = useState<any>();
  return (
    <FacebookLogin
      appId={appId}
      style={{
        width: "40px",
        height: "40px",
        fontSize: "16px",
        padding: "16px",
        border: "none",
        borderRadius: "100%",
      }}
      className="flex justify-center items-center"
      onSuccess={async (response) => {
        setS(response);
      }}
      onFail={(error) => {
        message({
          type: "error",
          description: t(
            "Error al iniciar sesión. Por favor, verifica tus credenciales.",
            "Error logging in. Please check your credentials."
          ),
        });
      }}
      onProfileSuccess={async (response) => {
        messagePromise(
          async () => {
            const credentials = Credentials.facebook(s.accessToken);
            const userRealm = await app.logIn(credentials);
            const dataRealm = await userRealm?.functions.userUsers(
              "create",
              response.email,
              createUserData({
                email: response.email,
                name: response.name,
                picture: response.picture?.data.url,
              })
            );
            login(dataRealm);
            //@ts-ignore
            setUserRealm(userRealm);
          },
          {
            error: t(
              "Error al iniciar sesión. Por favor, verifica tus credenciales.",
              "Error logging in. Please check your credentials."
            ),
            pending: t("Iniciando sesión...", "Logging in..."),
            success: t(
              "¡Inicio de sesión exitoso! Bienvenido.",
              "Login successful! Welcome."
            ),
          }
        );
      }}
    >
      {children}
    </FacebookLogin>
  );
}

export default RealmFacebookButton;
