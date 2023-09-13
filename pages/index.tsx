import { RealmGoogleButton } from "@/realmGoogleProvider";
import useLogoutGoogle from "@/realmGoogleProvider/components/useLogoutGoogle";
import { useIsLogin } from "@llampukaq/realm";
import { Button, useMessage } from "cllk";

export default function Home() {
  const { isLogin } = useIsLogin();
  const { logout } = useLogoutGoogle();
  const { message } = useMessage();
  return (
    <>
      <div className="w-[300px] mx-auto">
        {isLogin ? (
          <Button
            onClick={() => {
              logout()
                .then(() => {
                  message({ type: "success", description: "siiI" });
                })
                .catch(() => {
                  message({ type: "error", description: "siiI" });
                });
            }}
          >
            Salir
          </Button>
        ) : (
          <>
            <RealmGoogleButton
              onError={() => {
                message({ type: "error", description: "siiI" });
              }}
              onSuccess={() => {
                message({ type: "success", description: "siiI" });
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
