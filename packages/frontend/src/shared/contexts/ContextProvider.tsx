import React, { ReactChild } from 'react';
import { SocketProvider } from './socket.context';
import { UsernameProvider } from './username.context';

export default function ContextProvider({
  children,
}: {
  children: ReactChild[];
}) {
  return (
    <SocketProvider>
      <UsernameProvider>{children}</UsernameProvider>
    </SocketProvider>
  );
}
