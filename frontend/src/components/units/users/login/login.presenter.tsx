import { onClickSubmit } from "./login.queries";

export default function LoginUI(props) {
  const {
    register,
    handleSubmit,
    formState,
    router,
    setAccessToken,
    setIsLogin,
  } = props;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <>
      <form
        onSubmit={handleSubmit(
          onClickSubmit({ router, setAccessToken, setIsLogin })
        )}
      >
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
      <div>
        <a href={`${BASE_URL}/auth/login/google`}>구글로그인</a>
      </div>
      <div>
        <a href={`${BASE_URL}/auth/login/kakao`}>카카오로그인</a>
      </div>
      <div>
        <a href={`${BASE_URL}/auth/login/naver`}>네이버로그인</a>
      </div>
    </>
  );
}
