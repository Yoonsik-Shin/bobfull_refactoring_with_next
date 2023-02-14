import { authorizedAxios } from "@/commons/libraries/AuthorizedAxios";
import { accessTokenState } from "@/commons/store";
import { useRecoilValue } from "recoil";

export default function ProfileUpdatePage() {
  const accessToken = useRecoilValue(accessTokenState);

  const onClickSubmit = async () => {
    try {
      const result = await authorizedAxios({
        method: "post",
        url: "/users/upload",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      alert("변경될 이미지를 선택하지 않았습니다.");
    }
  };

  return <div onClick={onClickSubmit}>프로필 업데이트</div>;
}
