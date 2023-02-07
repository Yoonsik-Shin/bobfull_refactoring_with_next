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
    void router.push("/login");
  }
};
