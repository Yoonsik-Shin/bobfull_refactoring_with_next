import { authorizedAxios } from "@/commons/lib/AuthorizedAxios";
import { accessTokenState, isLoginState } from "@/commons/store";
import { useFecthUser } from "@/components/commons/hooks/useFetchUser";
import { useRouter } from "next/router";
import { useRecoilValue, useResetRecoilState } from "recoil";
import ProfileUI from "./profile.presenter";

export default function Profile() {
  const { userInfo } = useFecthUser();
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenState);
  const resetIsLogin = useResetRecoilState(isLoginState);
  const resetAccessToken = useResetRecoilState(accessTokenState);

  const onClickProfileImageUpdate = () => {
    void router.push("/profile/update/image");
  };

  const onClickProfileUpdate = () => {
    void router.push("/profile/update/privacy");
  };

  const onClickLogout = async () => {
    try {
      const result = await authorizedAxios({
        method: "post",
        url: "/auth/logout",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 201) {
        resetIsLogin();
        resetAccessToken();
        alert("성공적으로 로그아웃 되었습니다.");
        router.push("/");
      }
    } catch (error) {
      alert("변경될 이미지를 선택하지 않았습니다.");
    }
  };

  return (
    <ProfileUI
      userInfo={userInfo}
      onClickProfileImageUpdate={onClickProfileImageUpdate}
      onClickProfileUpdate={onClickProfileUpdate}
      onClickLogout={onClickLogout}
    />
  );
}
