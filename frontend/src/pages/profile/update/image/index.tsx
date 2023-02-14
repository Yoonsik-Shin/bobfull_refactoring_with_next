import { useFecthUser } from "@/components/commons/hooks/useFetchUser";
import { authorizedAxios } from "@/commons/libraries/AuthorizedAxios";
import { ChangeEvent, useRef, useState } from "react";
import { checkValidationFile } from "@/components/commons/libraries/validationFile";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/commons/store";
import FormData from "form-data";
import { useRouter } from "next/router";

export default function ProfileImageUpdatePage() {
  const { userInfo } = useFecthUser();
  const { nickname, email, id, createdAt, userProfile, userProfileImg } =
    userInfo;
  // const { alchol, gender, smoke, speed, talk } = userProfile || {};
  const { profileImage } = userProfileImg || {};
  const [imageUrl, setImageUrl] = useState(profileImage);

  const fileRef = useRef<HTMLInputElement>(null);
  const accessToken = useRecoilValue(accessTokenState);
  const formData = new FormData();
  const [data, setFormData] = useState();
  const router = useRouter();

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    formData.append("file", file);
    setFormData(formData);
    // for (let key of formData.keys()) {
    //   console.log(key, ":", formData.get(key));
    // }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  const onClickSubmit = async () => {
    try {
      const result = await authorizedAxios({
        method: "post",
        url: "/users/upload",
        data,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 201) {
        alert("정상적으로 변경되었습니다.");
        void router.push("/profile");
      }
    } catch (error) {
      alert("변경될 이미지를 선택하지 않았습니다.");
    }
  };

  return (
    <>
      <div>현재프로필</div>
      <img
        src={imageUrl ? imageUrl : profileImage}
        alt="회원프로필"
        style={{ width: "75px", height: "75px", borderRadius: "50%" }}
      />
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "gray" }}
        onClick={onClickImage}
      >
        프로필 이미지 변경하기
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
        accept="image/*"
        ref={fileRef}
      />
      <button onClick={onClickSubmit}>변경하기</button>
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
