import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MeetingGateway {

  @SubscribeMessage('join-room')
  handleJoinRoom(

    @MessageBody() roomId: string,

    @ConnectedSocket()
    client: Socket,

    @MessageBody() userId: string,

  ) {

    client.join(roomId);

    client.to(roomId).emit(
      'user-connected',
      userId,
    );

  }
}