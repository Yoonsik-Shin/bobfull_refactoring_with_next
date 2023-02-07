import { useFecthUser } from "@/components/commons/hooks/useFetchUser";
import ProfileUI from "./profile.presenter";

export default function Profile() {
  const { userInfo } = useFecthUser();

  return (
    <ProfileUI
      userInfo={userInfo} //
    />
  );
}
