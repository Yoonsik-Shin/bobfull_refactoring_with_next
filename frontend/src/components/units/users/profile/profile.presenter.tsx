export default function ProfileUI(props) {
  const {
    userInfo,
    onClickProfileImageUpdate,
    onClickProfileUpdate,
    onClickLogout,
  } = props;
  const { nickname, email, id, createdAt, userProfile, userProfileImg } =
    userInfo || {};
  const { alchol, gender, smoke, speed, talk } = userProfile || {};
  const { profileImage } = userProfileImg || {};

  return (
    <>
      <div>회원프로필</div>
      <img
        src={`${profileImage}`}
        alt="회원프로필"
        style={{ width: "75px", height: "75px", borderRadius: "50%" }}
      />
      <button onClick={onClickProfileImageUpdate}>프로필사진수정</button>
      <div>회원가입일: {createdAt}</div>
      <div>닉네임: {nickname}</div>
      <div>이메일: {email}</div>
      <div>성별: {gender ? "여성" : "남성"} </div>
      <div>음주여부: {alchol ? "o" : "x"} </div>
      <div>흡연여부: {smoke ? "o" : "x"} </div>
      <div>대화여부: {talk ? "o" : "x"} </div>
      <div>
        식사속도:
        {speed === 1 ? "엄청 느려요!" : ""}
        {speed === 2 ? "느려요!" : ""}
        {speed === 3 ? "보통이에요!" : ""}
        {speed === 4 ? "빨라요!" : ""}
        {speed === 5 ? "엄청 빨라요!" : ""}
      </div>
      <button onClick={onClickLogout}>로그아웃</button>
      <button onClick={onClickProfileUpdate}>회원정보수정</button>
    </>
  );
}
