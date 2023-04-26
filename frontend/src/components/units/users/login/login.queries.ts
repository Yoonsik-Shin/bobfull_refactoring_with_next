import { authorizedAxios } from "@/commons/lib/AuthorizedAxios";
import { IFormData, IVariable } from "./login.types";

export const onClickSubmit =
  ({ router, setAccessToken, setIsLogin }: IVariable) =>
  async (data: IFormData) => {
    try {
      // 1. 로그인해서 accessToken 받아오기
      const result = await authorizedAxios({
        method: "post",
        url: `/auth/login`,
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
      setIsLogin(true);
      alert("로그인에 성공하셨습니다.");

      // 3. 로그인 성공페이지로 이동하기
      void router.push("/");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
