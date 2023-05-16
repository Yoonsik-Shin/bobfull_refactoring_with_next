import { Socket, Namespace } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';

const createdRooms: string[] = [];

@WebSocketGateway({
  namespace: 'chattings',
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>, // private logger = new Logger('Gateway'),
  ) {}
  @WebSocketServer() nsp: Namespace;
  afterInit() {
    // this.nsp.adapter.on('create-room', (room) => {
    //   this.logger.log(`"Room:${room}"이 생성되었습니다.`);
    // });
    // this.nsp.adapter.on('join-room', (room, id) => {
    //   this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    // });
    // this.nsp.adapter.on('leave-room', (room, id) => {
    //   this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    // });
    // this.nsp.adapter.on('delete-room', (roomName) => {
    //   this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
    // });
    // this.logger.log('웹소켓 서버 초기화 ✅');
  }
  handleConnection(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`${socket.id} 소켓 연결`);
    console.log(socket.id);
    socket.broadcast.emit('message', `${socket.id}가 들어왔습니다.`);
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() { roomName, message }: { roomName: string; message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    await this.chatModel.create({
      message,
    });
    console.log(message);
    console.log(socket.id);
    // console.log(socket);
    socket.broadcast.to(roomName).emit('message', message);
    return message;
  }

  @SubscribeMessage('room-list')
  handleRoomList() {
    return createdRooms;
  }
}
