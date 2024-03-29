import { authorizedAxios } from "@/commons/lib/AuthorizedAxios";
import { refreshAccessToken } from "@/commons/lib/getRefreshAccessToken";
import { IVariable } from "./profile.types";

export const fetchUser = async ({
  accessToken,
  setAccessToken,
  setIsLogin,
}: IVariable) => {
  try {
    const result = await authorizedAxios({
      method: "get",
      url: `/users`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return await result.data;
  } catch (error) {
    await refreshAccessToken({ accessToken }).then(async (token) => {
      const result = await authorizedAxios({
        method: "get",
        url: `/users`,
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccessToken(token);
      setIsLogin(true);

      return await result.data;
    });
  }
};
