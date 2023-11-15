import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: false,
  },
})
export class SocketsGateway {
  @WebSocketServer()
  private server: Server;

  sendIncident(): void {
    this.server.emit('incident');
  }
}
