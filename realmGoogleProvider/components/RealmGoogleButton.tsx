import {
  Credentials,
  useApp,
  useAuth,
  useSetUserRealm,
} from "@llampukaq/realm";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { nanoid } from "nanoid";
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
  const { login, customDataUser } = useAuth();

  function parseLanguageTag(languageTag: string) {
    const [language, country] = languageTag.split("-");
    return {
      country: country,
      language: language,
    };
  }

  const data = ({ email, picture, name }: typeof googleData) => {
    return {
      userId: nanoid(11),
      created: new Date(),
      name,
      email,
      picture,
      ...(customDataUser ?? {}),
      ...parseLanguageTag(navigator.language),
    };
  };
  return (
    <div>
      <GoogleLogin
        text="continue_with"
        onSuccess={async (response) => {
          const dataInformacion = jwtDecode(
            response.credential as string
          ) as typeof googleData;
          const credentials = Credentials.google({
            idToken: response.credential as string,
          });
          const user = await app.logIn(credentials);
          const w = data(dataInformacion);
          const dataRealm = await user.functions.userUsers(
            "create",
            dataInformacion.email,
            w
          );
          login(dataRealm);
          setUserRealm(user);
          onSuccess?.(dataRealm, user);
        }}
        onError={() => {
          onError?.();
        }}
        useOneTap
      />
    </div>
  );
}

export default RealmGoogleButton;
