import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { PropsWithChildren } from "react";

function RealmGoogleProvider({
  clientId,
  children,
}: PropsWithChildren<{ clientId: string }>) {
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}

export default RealmGoogleProvider;
