import React, { useContext, useEffect, useState } from 'react';
import { fromEvent, tap } from 'rxjs';
import SocketContext from '../../../shared/contexts/socket.context';
import { CursorProps } from '../Cursor';

const CURSOR_MOVE_EVENT = 'cursor-move';

interface MultiCursorsState {
  [key: string]: CursorProps;
}

export function useMultiCursor() {
  const socket = useContext(SocketContext);
  const [multiCursors, setMultiCursors] = useState<MultiCursorsState>({});

  useEffect(() => {
    if (!socket) return;
    const cursorMoveEvent$ = fromEvent(socket, CURSOR_MOVE_EVENT);
    const subscription = cursorMoveEvent$
      .pipe(
        tap((message: MultiCursorsState) => {
          // TODO Use deep clone to prevent side effects
          const result = message;
          delete result[socket.id];

          setMultiCursors(result);
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [socket]);

  return multiCursors;
}
