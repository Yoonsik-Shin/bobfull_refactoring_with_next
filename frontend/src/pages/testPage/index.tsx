import { authorizedAxios } from "@/commons/libraries/AuthorizedAxios";
import { accessTokenState } from "@/commons/store";
import { useRecoilState } from "recoil";

export default function TestPage() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onClickUserButton = async () => {
    try {
      const resultUser = await authorizedAxios({
        method: "get",
        url: `/users`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const result = await authorizedAxios({
        method: "post",
        url: `/auth/restore`,
        data: accessToken,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAccessToken(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const a = () => {
    setAccessToken("ㅂㅇ");
    console.log(accessToken);
  };

  return (
    <>
      <button onClick={onClickUserButton}>유저테스트버튼</button>
      <button onClick={refreshAccessToken}>테스트버튼</button>
      <button onClick={a}>테스트버튼</button>
      <br />
    </>
  );
}
