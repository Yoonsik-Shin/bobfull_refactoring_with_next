import { authorizedAxios } from "@/commons/libraries/AuthorizedAxios";
import { IVariable } from "./profile.types";

export const fetchUser = async ({ router, accessToken }: IVariable) => {
  try {
    const result = await authorizedAxios({
      method: "get",
      url: `/users`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return await result.data;
  } catch (error) {
    alert("로그인 해주세요");
    void router.push("/login");
  }
};
