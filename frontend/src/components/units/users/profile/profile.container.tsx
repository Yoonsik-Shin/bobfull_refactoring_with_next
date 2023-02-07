import { accessTokenState } from "@/commons/store";
import { useFecthUser } from "@/components/commons/hooks/useFetchUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ProfileUI from "./profile.presenter";
import { fetchUser } from "./profile.queries";

export default function Profile() {
  const { userInfo } = useFecthUser();

  return (
    <ProfileUI
      userInfo={userInfo} //
    />
  );
}
