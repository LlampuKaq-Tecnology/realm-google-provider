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
        messagePromise(
          async () => {
            const credentials = Credentials.facebook(response.accessToken);
            const userRealm = await app.logIn(credentials);
            setS(userRealm);
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
            const dataRealm = await s?.functions.userUsers(
              "create",
              response.email,
              createUserData({
                email: response.email,
                name: response.name,
                picture: response.picture?.data.url,
              })
            );
            console.log(dataRealm);
            login(dataRealm);
          },
          {
            error: t(
              "Error al crear el usuario. Intenta nuevamente.",
              "Error creating user. Please try again."
            ),
            pending: t("Creando usuario...", "Creating user..."),
            success: t(
              "¡Usuario creado con éxito!",
              "User created successfully!"
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
