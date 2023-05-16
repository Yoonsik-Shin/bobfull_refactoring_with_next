import { useChatRoomScroll } from "@/components/units/chats/room/chatroom.scroll";
import { socket } from "@/pages/_app";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export default function ChatDetailPage() {
  const router = useRouter();
  const roomName = router.query.roomName;
  const [message, setMessage] = useState("");
  const [data, setData] = useState<string[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);

  const onChangeMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSubmitMsg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return alert("메시지를 입력해 주세요.");
    socket.emit("message", { roomName, message }, (chat) => {
      setData((prev) => [...prev, chat]);
      setMessage("");
    });
  };

  useChatRoomScroll({ chatContainer, data });
  // useEffect(() => {
  //   if (!chatContainer.current) return;
  //   const { scrollHeight, clientHeight } = chatContainer.current;

  //   if (scrollHeight > clientHeight) {
  //     chatContainer.current.scrollTop = scrollHeight - clientHeight;
  //   }
  // }, [data.length]);

  useEffect(() => {
    const messageHandler = (chat) => setData((prev) => [...prev, chat]);
    socket.on("message", messageHandler);

    return () => {
      socket.off("message", messageHandler);
    };
  }, []);

  const onLeaveRoom = () => {
    socket.emit("leave-room", roomName, () => {
      router.push("/chat");
    });
  };

  return (
    <>
      <div>채팅 디테일 페이지</div>
      <button onClick={onLeaveRoom}>방 나가기</button>
      <div ref={chatContainer}>
        {data && data.map((el, index) => <div key={index}>{el}</div>)}
      </div>
      <form onSubmit={onSubmitMsg}>
        <input type="text" onChange={onChangeMsg} value={message} />
        <button>버튼</button>
      </form>
    </>
  );
}
