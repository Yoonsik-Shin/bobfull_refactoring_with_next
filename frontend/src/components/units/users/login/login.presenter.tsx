import { onClickSubmit } from "./login.queries";

export default function LoginUI(props) {
  const { register, handleSubmit, formState, router, setAccessToken } = props;

  return (
    <form onSubmit={handleSubmit(onClickSubmit({ router, setAccessToken }))}>
      이메일: <input type="text" {...register("email")} />
      <div>{formState.errors.email?.message}</div>
      비밀번호: <input type="password" {...register("password")} />
      <div>{formState.errors.password?.message}</div>
      <button
        style={{ backgroundColor: formState.isValid ? "yellow" : "black" }}
      >
        로그인
      </button>
    </form>
  );
}
