import { accessTokenState } from "@/commons/store";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

export default function TestPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onClickUserButton = async () => {
    const resultUser = await axios({
      method: "get",
      url: `${BASE_URL}/users`,
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    console.log(resultUser);
  };

  const onClickButton = async () => {
    const result = await axios({
      method: "post",
      url: `${BASE_URL}/auth/restore`,
      data: accessToken,
      withCredentials: true,
    });

    console.log(result);
  };

  const a = () => {
    setAccessToken("ㅂㅇ");
    console.log(accessToken);
  };

  return (
    <>
      <button onClick={onClickUserButton}>유저테스트버튼</button>
      <button onClick={onClickButton}>테스트버튼</button>
      <button onClick={a}>테스트버튼</button>
      <br />
    </>
  );
}
