import { accessTokenState } from "@/commons/store";
import { fetchUser } from "@/components/units/users/profile/profile.queries";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export function useFecthUser() {
  const router = useRouter();
  const accessToken: string = useRecoilValue(accessTokenState);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    fetchUser({ accessToken, router }).then((response) => {
      setUserInfo(response);
    });
  }, []);

  return {
    userInfo,
  };
}
