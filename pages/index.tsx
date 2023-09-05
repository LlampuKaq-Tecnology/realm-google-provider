import { RealmGoogleButton } from "@/realmGoogleProvider";
import useLogoutGoogle from "@/realmGoogleProvider/components/useLogoutGoogle";
import { useIsLogin } from "@llampukaq/realm";

export default function Home() {
  const { isLogin } = useIsLogin();
  const { logout } = useLogoutGoogle();
  return (
    <>
      <div className="w-[300px] mx-auto">
        {isLogin ? (
          <button onClick={logout}>alir</button>
        ) : (
          <>
            <RealmGoogleButton />
          </>
        )}
      </div>
    </>
  );
}
