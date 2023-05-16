import { IFormData } from "./signup.types";
import { authorizedAxios } from "@/commons/lib/AuthorizedAxios";

export const onClickSubmit = async (data: IFormData) => {
  const result = await authorizedAxios({
    method: "post",
    url: "/users/signup",
    data,
  });
};
