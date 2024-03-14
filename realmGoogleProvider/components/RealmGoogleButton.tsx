import {
  Credentials,
  useApp,
  useAuth,
  useSetUserRealm,
} from "@llampukaq/realm";
import {
  GoogleLogin,
  GoogleLoginProps,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import React from "react";
export interface googleData {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
}
function RealmGoogleButton<T>({
  appId,
  onSuccess,
  //@ts-ignore
  googleOpt = {
    type: "icon",
    shape: "circle",
    cancel_on_tap_outside: true,
    theme: "filled_blue",
  },
}: {
  appId: string;
  googleOpt?: Partial<GoogleLoginProps>;
  onSuccess?: (fn: () => Promise<any>) => void;
}) {
  const app = useApp();
  const { setUserRealm } = useSetUserRealm();
  const { login, createUserData } = useAuth();

  return (
    <GoogleOAuthProvider clientId={appId}>
      <GoogleLogin
        {...googleOpt}
        onSuccess={async (response) => {
          if (onSuccess != undefined) {
            onSuccess?.(async () => {
              const dataInformacion = jwtDecode(
                response.credential as string
              ) as googleData;

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
            });
          } else {
            const dataInformacion = jwtDecode(
              response.credential as string
            ) as googleData;

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
              })
            );
            login(dataRealm);
            //@ts-ignore
            setUserRealm(userRealm);
          }
        }}
        onError={() => {}}
      />
    </GoogleOAuthProvider>
  );
}

export default RealmGoogleButton;
