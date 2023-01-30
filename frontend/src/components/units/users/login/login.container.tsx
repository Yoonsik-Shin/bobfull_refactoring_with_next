import { IFormData, schema } from "./login.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoginUI from "./login.presenter";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/commons/store";

export default function Login() {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    // mode: "onChange", // 입력할때마다 입력검증
  });
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();

  return (
    <LoginUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      router={router}
      setAccessToken={setAccessToken}
    />
  );
}
