import { RealmFacebookButton, RealmGoogleButton } from "@/realmGoogleProvider";

export default function Home() {
  return (
    <>
      <RealmFacebookButton appId="" />
      <RealmGoogleButton appId={process.env.NEXT_PUBLIC_GOOGLE as string} />
    </>
  );
}
