import FacebookLogin from "@greatsumini/react-facebook-login";
import {
  Credentials,
  useApp,
  useAuth,
  useSetUserRealm,
} from "@llampukaq/realm";

import React, { ReactNode, useState } from "react";

function RealmFacebookButton({
  appId,
  children,
  onSuccess,
}: {
  appId: string;
  children?: ReactNode;
  onSuccess?: (fn: () => Promise<any>) => void;
}) {
  const app = useApp();
  const { setUserRealm } = useSetUserRealm();
  const { login, createUserData } = useAuth();
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
      onFail={(error) => {}}
      onProfileSuccess={async (response) => {
        if (onSuccess != undefined) {
          onSuccess?.(async () => {
            const credentials = Credentials.facebook(s.accessToken);
            const userRealm = await app.logIn(credentials);
            const dataRealm = await userRealm?.functions.userUsers(
              "create",
              response.email,
              createUserData({
                email: response.email,
                name: response.name,
              })
            );
            login(dataRealm);
            //@ts-ignore
            setUserRealm(userRealm);
          });
        } else {
          const credentials = Credentials.facebook(s.accessToken);
          const userRealm = await app.logIn(credentials);
          const dataRealm = await userRealm?.functions.userUsers(
            "create",
            response.email,
            createUserData({
              email: response.email,
              name: response.name,
            })
          );
          login(dataRealm);
          //@ts-ignore
          setUserRealm(userRealm);
        }
      }}
    >
      {children}
    </FacebookLogin>
  );
}

export default RealmFacebookButton;
