import React, { createContext, ReactChild } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8080';

const socket = io(SOCKET_URL);
type SocketContextInitialState = Socket | null;
const SocketContext = createContext<SocketContextInitialState>(null);
export const SocketProvider = ({ children }: { children: ReactChild }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
