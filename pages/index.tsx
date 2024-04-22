import {
  RealmFacebookButton,
  RealmGoogleButton,
  useLogoutGoogle,
} from "@/realmGoogleProvider";
import RealmTiktokButton from "@/realmGoogleProvider/components/RealmTiktokButton";
import { useIsLogin } from "@llampukaq/realm";
import { Button, useMessage } from "cllk";

export default function Home() {
  const { isLogin } = useIsLogin();
  const { logout } = useLogoutGoogle();
  const { messagePromise } = useMessage();
  return (
    <>
      <RealmTiktokButton />
    </>
  );
  return (
    <>
      {isLogin ? (
        <>
          <Button onClick={logout}>Close</Button>
        </>
      ) : (
        <>
          <RealmFacebookButton appId="2169993853332310">
            <div className="bg-blue-500 p-2 rounded-full">F</div>
          </RealmFacebookButton>
          <RealmGoogleButton
            googleOpt={{ size: "large" }}
            onSuccess={(fn) => {
              messagePromise(fn, {
                error: "Error",
                pending: "Pedings...",
                success: "Siiu",
              });
            }}
            appId={process.env.NEXT_PUBLIC_GOOGLE as string}
          />
        </>
      )}
    </>
  );
}
