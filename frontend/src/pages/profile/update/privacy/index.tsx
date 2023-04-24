import { authorizedAxios } from "@/commons/lib/AuthorizedAxios";
import { accessTokenState } from "@/commons/store";
import RadioButton01 from "@/components/commons/buttons/radio/01";
import { useFecthUser } from "@/components/commons/hooks/useFetchUser";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

export default function ProfileUpdatePage() {
  const accessToken = useRecoilValue(accessTokenState);
  const { userInfo } = useFecthUser();
  const { nickname, userProfile } = userInfo;
  const { alchol, gender, smoke, speed, talk } = userProfile || {};
  const router = useRouter();

  const onClickSubmit = async () => {
    try {
      const result = await authorizedAxios({
        method: "post",
        url: "/users/upload",
        headers: { Authorization: `Bearer ${accessToken}` },
        data: "",
      });
    } catch (error) {
      alert("변경될 이미지를 선택하지 않았습니다.");
    }
  };

  return (
    <>
      <div>{nickname}</div>
      <div>성별 : {gender ? "여자" : "남자"}</div>
      <div>음주여부 : {alchol ? "YES" : "NO"}</div>
      <div>흡연여부 : {smoke ? "YES" : "NO"}</div>
      <div>대화여부 : {talk ? "YES" : "NO"}</div>
      <div>식사속도 : {speed}</div>

      <RadioButton01 />
      <RadioButton01 />
      <RadioButton01 />
      <RadioButton01 />
      {/* <FormControl style={{ display: "flex" }}>
        <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value={true} control={<Radio />} label="여성" />
          <FormControlLabel value={false} control={<Radio />} label="남성" />
        </RadioGroup>
      </FormControl>

      <FormControl style={{ display: "flex" }}>
        <FormLabel id="demo-row-radio-buttons-group-label">음주여부</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="마셔요" control={<Radio />} label="Female" />
          <FormControlLabel value="안마셔요" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl> */}

      <button onClick={onClickSubmit}>프로필 업데이트</button>
      <button
        onClick={() => {
          void router.push("/profile");
        }}
      >
        돌아가기
      </button>
    </>
  );
}
