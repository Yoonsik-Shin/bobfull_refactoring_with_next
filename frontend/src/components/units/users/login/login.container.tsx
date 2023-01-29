import { IFormData, schema } from "./login.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoginUI from "./login.presenter";
import { onClickSubmit } from "./login.queries";

export default function Login() {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    // mode: "onChange", // 입력할때마다 입력검증
  });

  return (
    <LoginUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onClickSubmit={onClickSubmit}
    />
  );
}
