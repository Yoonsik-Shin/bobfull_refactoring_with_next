import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { socket } from "../_app";

export default function ChatIndexPage() {
  const [rooms, setRooms] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const roomListHandler = (rooms: string[]) => {
      setRooms(rooms);
    };
    const createRoomHandler = (newRoom: string) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    };
    const deleteRoomHandler = (roomName: string) => {
      setRooms((prevRooms) => prevRooms.filter((room) => room !== roomName));
    };

    socket.emit("room-list", roomListHandler);
    socket.on("create-room", createRoomHandler);
    socket.on("delete-room", deleteRoomHandler);

    return () => {
      socket.off("room-list", roomListHandler);
      socket.off("create-room", createRoomHandler);
      socket.off("delete-room", deleteRoomHandler);
    };
  }, []);

  const onCreateRoom = () => {
    const roomName = "";
    if (!roomName) return alert("방 이름 에러");

    socket.emit("create-room", roomName, (response) => {
      alert("방이 생성되었습니다.");
    });
  };

  const onJoinRoom = (roomName) => () => {
    socket.emit("join-room", roomName, () => {
      router.push(`/chat/${roomName}`);
    });
  };

  return (
    <>
      <div>채팅 인덱스 페이지</div>
      <button onClick={onCreateRoom}>채팅방 생성하기</button>
      {rooms.map((room, index) => (
        <>
          <div key={index}>
            <div>{room}</div>
            <button onClick={onJoinRoom(room)}>입장하기</button>
          </div>
        </>
      ))}
    </>
  );
}
