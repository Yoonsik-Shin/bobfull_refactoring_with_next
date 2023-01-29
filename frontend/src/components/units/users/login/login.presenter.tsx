export default function LoginUI(props) {
  const { register, handleSubmit, formState, onClickSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      이메일: <input type="text" {...register("email")} />
      <div>{formState.errors.email?.message}</div>
      비밀번호: <input type="password" {...register("password")} />
      <div>{formState.errors.password?.message}</div>
      <button style={{ backgroundColor: formState.isValid ? "yellow" : "" }}>
        로그인
      </button>
    </form>
  );
}
