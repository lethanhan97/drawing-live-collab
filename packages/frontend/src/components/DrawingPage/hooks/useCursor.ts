import { RefObject, useContext, useEffect, useState } from 'react';
import { fromEvent, map, merge, Observable, tap } from 'rxjs';
import SocketContext from '../../../shared/contexts/socket.context';
import UsernameContext from '../../../shared/contexts/username.context';
import { CursorProps } from '../Cursor';

interface CursorCustomEvent {
  eventType: 'mouseMove' | 'mouseLeave';
  eventPayload: MouseEvent;
}

const CUSOR_MOVE_EVENT = 'cursor-move';

export function useCursor(canvasRef: RefObject<HTMLCanvasElement>) {
  const usernameContext = useContext(UsernameContext);
  const socket = useContext(SocketContext);
  const [cursorDisplayState, setCursorDisplayState] = useState<
    Omit<CursorProps, 'cursorDisplay'>
  >({
    shouldDisplay: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const { current: canvasEl } = canvasRef;

    const mouseMove$: Observable<CursorCustomEvent> = fromEvent<MouseEvent>(
      canvasEl,
      'mousemove'
    ).pipe(map((eventPayload) => ({ eventType: 'mouseMove', eventPayload })));

    const mouseLeave$: Observable<CursorCustomEvent> = fromEvent<MouseEvent>(
      canvasEl,
      'mouseleave'
    ).pipe(map((eventPayload) => ({ eventType: 'mouseLeave', eventPayload })));

    const subscription = merge(mouseMove$, mouseLeave$)
      .pipe(
        tap(({ eventType, eventPayload }) => {
          if (eventType === 'mouseLeave') {
            socket?.emit(CUSOR_MOVE_EVENT, {
              shouldDisplay: false,
              cursorDisplay: usernameContext.username,
              x: 0,
              y: 0,
            });
            setCursorDisplayState((prevState) => ({
              ...prevState,
              shouldDisplay: false,
            }));
          } else {
            const { clientX: x, clientY: y } = eventPayload;
            socket?.emit(CUSOR_MOVE_EVENT, {
              shouldDisplay: true,
              cursorDisplay: usernameContext.username,
              x,
              y,
            });
            setCursorDisplayState({
              shouldDisplay: true,
              x,
              y,
            });
          }
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [canvasRef, socket, usernameContext]);

  return {
    ...cursorDisplayState,
    cursorDisplay: usernameContext.username,
    key: socket?.id || '',
  };
}
