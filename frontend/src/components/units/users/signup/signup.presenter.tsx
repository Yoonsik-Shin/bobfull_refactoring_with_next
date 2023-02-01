import { onClickSubmit } from "./signup.queries";

export default function SignupUI(props) {
  const { register, handleSubmit, formState } = props;

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      이메일: <input type="text" {...register("email")} />
      <div>{formState.errors.email?.message}</div>
      비밀번호: <input type="password" {...register("password")} />
      <div>{formState.errors.password?.message}</div>
      <button style={{ backgroundColor: formState.isValid ? "yellow" : "" }}>
        등록하기
      </button>
    </form>
  );
}
