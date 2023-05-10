import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';

@WebSocketGateway({
  namespace: 'chattings',
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatsGateway {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
  ) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.chatModel.create({
      message,
    });
    console.log(message);
    console.log(socket.id);
    socket.broadcast.emit('message', message);
    return message;
  }
}
