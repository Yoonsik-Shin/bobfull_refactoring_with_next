import axios from "axios";

export const refreshAccessToken = async ({ accessToken }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const newAccessToken = await axios({
      method: "post",
      url: `${BASE_URL}/auth/restore`,
      data: `Bearer ${accessToken}`,
      withCredentials: true,
    });

    return newAccessToken.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
