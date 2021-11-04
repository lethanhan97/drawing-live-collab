import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
const appServer = createServer(app);
const io = new Server(appServer, {
  cors: {
    credentials: false,
  },
});
const PORT = 8080;

app.get('/', (_, res) => {
  res.status(200).json({
    message: 'what s upppp',
  });
});

enum SocketEvents {
  Draw = 'draw',
  CursorMove = 'cursor-move',
}

interface Cursor {
  shouldDisplay: boolean;
  cursorDisplay: string;
  x: number;
  y: number;
}

type CursorState = {
  [key: string]: Cursor;
};

const createDefaultCursor = (): Cursor => ({
  shouldDisplay: false,
  cursorDisplay: '',
  x: 0,
  y: 0,
});

const cursors: CursorState = {};
io.on('connection', (socket) => {
  cursors[socket.id] = createDefaultCursor();

  console.log('connection count', io.sockets.sockets.size);
  socket.on('disconnect', () => {
    delete cursors[socket.id];
  });

  socket.on(SocketEvents.Draw, (message) => {
    socket.broadcast.emit(SocketEvents.Draw, message);
  });

  socket.on(SocketEvents.CursorMove, (message: Cursor) => {
    cursors[socket.id] = message;

    socket.broadcast.emit(SocketEvents.CursorMove, cursors);
  });
});

appServer.listen(process.env.PORT || PORT, () => {
  console.log('app is running');
});
