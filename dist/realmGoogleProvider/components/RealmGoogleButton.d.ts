import { GoogleLoginProps } from "@react-oauth/google";
export interface googleData {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    locale: string;
    name: string;
    picture: string;
}
declare function RealmGoogleButton<T>({ appId, onSuccess, googleOpt, }: {
    appId: string;
    googleOpt?: Partial<GoogleLoginProps>;
    onSuccess?: (fn: () => Promise<any>) => void;
}): import("react/jsx-runtime").JSX.Element;
export default RealmGoogleButton;
