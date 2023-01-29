import SignupUI from "./signup.presenter";
import { IFormData, schema } from "./signup.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Signup() {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    // mode: "onChange", // 입력할때마다 입력검증
  });
  const onClickSubmit = async (data: IFormData) => {
    const result = await axios({
      method: "post",
      url: "http://localhost:3000/users/signup",
      data: data,
    });
    console.log(data);
    console.log(result);
  };

  return (
    <SignupUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onClickSubmit={onClickSubmit}
    />
  );
}
