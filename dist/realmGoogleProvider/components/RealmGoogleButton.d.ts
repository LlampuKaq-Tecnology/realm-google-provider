declare function RealmGoogleButton<T>({ onError, onSuccess, }: {
    onSuccess?: (user: T, userRealm: any) => void;
    onError?: any;
}): import("react/jsx-runtime").JSX.Element;
export default RealmGoogleButton;
