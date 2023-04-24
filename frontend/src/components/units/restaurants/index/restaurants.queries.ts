import { authorizedAxios } from "@/commons/lib/AuthorizedAxios";
import { Dispatch, SetStateAction } from "react";

interface IAccessToken {
  accessToken: string;
  setRestaurants: Dispatch<SetStateAction<object[]>>;
  page: number;
  limit: number;
}

export const fetchRestaurant = async ({
  accessToken,
  setRestaurants,
  page,
  limit,
}: IAccessToken) => {
  const result = await authorizedAxios({
    method: "get",
    url: `/restaurant?page=${page}&limit=${limit}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  setRestaurants((prev) => [...prev, ...result.data]);
};
