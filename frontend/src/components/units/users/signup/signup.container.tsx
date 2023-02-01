import SignupUI from "./signup.presenter";
import { IFormData, schema } from "./signup.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    // mode: "onChange", // 입력할때마다 입력검증
  });

  return (
    <SignupUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
    />
  );
}
