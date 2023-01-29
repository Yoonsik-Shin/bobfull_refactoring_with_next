import axios from "axios";
import { IFormData } from "./login.types";

export const onClickSubmit = async (data: IFormData) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const result = await axios({
      method: "post",
      url: `${BASE_URL}/auth`,
      data: data,
    });

    const accessToken = result.data;

    console.log(accessToken);
    console.log(data);
    console.log(result);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
};
