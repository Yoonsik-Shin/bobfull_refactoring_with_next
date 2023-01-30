import axios from "axios";
import { IFormData, IVariable } from "./login.types";

export const onClickSubmit =
  ({ router, setAccessToken }: IVariable) =>
  async (data: IFormData) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      // 1. 로그인해서 accessToken 받아오기
      const result = await axios({
        method: "post",
        url: `${BASE_URL}/auth`,
        data: data,
      });

      const accessToken = result.data;
      console.log(accessToken);

      // 2. accessToken을 globalState에 저장하기
      if (!accessToken) {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      setAccessToken(accessToken);
      alert("엑세스토큰 저장됨");

      // 3. 로그인 성공페이지로 이동하기
      void router.push("/");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
