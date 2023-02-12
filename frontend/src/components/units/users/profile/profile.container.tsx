import { useFecthUser } from "@/components/commons/hooks/useFetchUser";
import { useRouter } from "next/router";
import ProfileUI from "./profile.presenter";

export default function Profile() {
  const { userInfo } = useFecthUser();
  const router = useRouter();

  const onClickProfileUpdate = () => {
    void router.push("/profile/update");
  };

  return (
    <ProfileUI
      userInfo={userInfo} //
      onClickProfileUpdate={onClickProfileUpdate}
    />
  );
}
