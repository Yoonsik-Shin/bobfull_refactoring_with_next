import { useFecthUser } from "@/components/commons/hooks/useFetchUser";
import { authorizedAxios } from "@/commons/lib/AuthorizedAxios";
import { ChangeEvent, useRef, useState } from "react";
import { checkValidationFile } from "@/components/commons/lib/validationFile";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/commons/store";
import FormData from "form-data";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProfileImageUpdatePage() {
  const { userInfo } = useFecthUser();
  const { nickname, email, id, createdAt, userProfile, userProfileImg } =
    userInfo;
  // const { alchol, gender, smoke, speed, talk } = userProfile || {};
  const { profileImage } = userProfileImg || {};
  const [imageUrls, setImageUrls] = useState<string[]>(["", "", ""]); // 업로드할 파일 개수만큼
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const accessToken = useRecoilValue(accessTokenState);
  const [data, setFormData] = useState<FormData>();
  const [imgUpdate, setImgUpdate] = useState(false);
  const router = useRouter();

  const onChangeFile =
    (index: number) => async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const isValid = checkValidationFile(file);
      if (!isValid) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        // 임시로 보여줄 이미지들
        const tempUrls = [...imageUrls];
        tempUrls[index] = e.target?.result;
        setImageUrls(tempUrls);

        // 전송할 이미지들
        const tempFiles = [...files];
        tempFiles[index] = file;
        setFiles(tempFiles);
      };
    };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  const onClickSubmit = async () => {
    console.time("=== 전체 Promise ===");
    // 각각 따로 파일업로드 API 요청
    const results = await Promise.all(
      files.map((el) => {
        const formData = new FormData();
        formData.append("file", el);
        const result = authorizedAxios({
          method: "post",
          url: "/users/upload",
          data: formData,
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return result;
      })
    );
    // 하나의 배열에 결과 받아옴
    const resultUrls = results.map((el) =>
      el ? el.data.userProfileImg.profileImage : ""
    );

    console.log(resultUrls);
  };

  return (
    <>
      <input type="file" onChange={onChangeFile(0)} />
      <input type="file" onChange={onChangeFile(1)} />
      <input type="file" onChange={onChangeFile(2)} />
      <img src={imageUrls[0]} />
      <img src={imageUrls[1]} />
      <img src={imageUrls[2]} />
      <button onClick={onClickSubmit}>게시글 등록</button>
    </>
  );
}
