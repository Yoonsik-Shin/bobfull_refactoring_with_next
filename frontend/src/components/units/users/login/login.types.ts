import * as yup from "yup";
import { NextRouter } from "next/router";
import { SetterOrUpdater } from "recoil";

export interface IFormData {
  email: string;
  password: string;
}

export interface IVariable {
  router: NextRouter;
  setAccessToken: SetterOrUpdater<string>;
}

export const schema = yup.object({
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리 이상 입력해 주세요.")
    .max(15, "비밀번호는 최대 15자리로 입력해 주세요.")
    .required("비밀번호는 필수 입력입니다."),

  email: yup
    .string()
    .email("이메일 형식에 적합하지 않습니다.")
    .required("이메일은 필수 입력입니다."),

  // phone: yup
  //   .string()
  //   .matches(/^\d{3}-\d{3,4}-\d{4}$/, "휴대폰 형식에 알맞지 않습니다.")
  //   .required("휴대폰은 필수 입력입니다."),
});
