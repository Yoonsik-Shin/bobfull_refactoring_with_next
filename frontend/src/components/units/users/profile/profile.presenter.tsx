export default function ProfileUI(props) {
  const { userInfo } = props;
  const { nickname, email, id, createdAt, userprofile } = userInfo;
  const { alchol, gender, smoke, speed, talk } = userprofile || {};
  console.log(userprofile);

  return (
    <>
      <div>회원프로필</div>
      <div>닉네임: {nickname}</div>
      <div>이메일: {email}</div>
      <div>성별: {alchol ? "여성" : "남성"} </div>
      <div>음주여부: {alchol ? "o" : "x"} </div>
      <div>흡연여부: {smoke ? "o" : "x"} </div>
      <div>대화여부: {talk ? "o" : "x"} </div>
      <div>
        식사속도:
        {speed == 1 ? "엄청 느려요!" : ""}
        {speed == 2 ? "느려요!" : ""}
        {speed == 3 ? "보통이에요!" : ""}
        {speed == 4 ? "빨라요!" : ""}
        {speed == 5 ? "엄청 빨라요!" : ""}
      </div>
    </>
  );
}
