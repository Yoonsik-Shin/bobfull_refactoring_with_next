import { accessTokenState, isLoginState } from "@/commons/store";
import { fetchUser } from "@/components/units/users/profile/profile.queries";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export function useFecthUser() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    fetchUser({ accessToken, router, setAccessToken, setIsLogin }).then(
      (response) => {
        setUserInfo(response);
      }
    );
  }, []);

  return {
    userInfo,
  };
}
