import {
  RealmFacebookButton,
  RealmGoogleButton,
  useLogoutGoogle,
} from "@/realmGoogleProvider";
import { useIsLogin, useUser } from "@llampukaq/realm";
import { Button, H1 } from "cllk";

export default function Home() {
  const { isLogin } = useIsLogin();
  const { logout } = useLogoutGoogle();
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
          <RealmGoogleButton appId={process.env.NEXT_PUBLIC_GOOGLE as string} />
        </>
      )}
    </>
  );
}
