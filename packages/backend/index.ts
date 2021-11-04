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

io.on('connection', (socket) => {
  console.log('somebody connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

appServer.listen(process.env.PORT || PORT, () => {
  console.log('app is running');
});
