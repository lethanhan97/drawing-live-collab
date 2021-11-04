import { RefObject, useContext, useEffect } from 'react';
import { fromEvent, tap, switchMap, takeUntil, finalize } from 'rxjs';
import SocketContext from '../../../shared/contexts/socket.context';

type DrawingSocketMessage = {
  state: 'begin' | 'drawing' | 'close';
  x: number;
  y: number;
};

const DRAWING_TOPIC = 'draw';

export function useDrawing(canvasRef: RefObject<HTMLCanvasElement>) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket || !canvasRef.current) return;
    const { current: canvasEl } = canvasRef;
    const context = canvasEl.getContext('2d');

    const socketDrawing$ = fromEvent(socket, DRAWING_TOPIC);
    const subscription = socketDrawing$
      .pipe(
        tap(({ state, x, y }: DrawingSocketMessage) => {
          switch (state) {
            case 'begin':
              context?.beginPath();
              context?.moveTo(x, y);
              break;
            case 'drawing':
              context?.lineTo(x, y);
              context?.stroke();
              break;
            default:
              context?.closePath();
          }
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [socket]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { current: canvasEl } = canvasRef;
    const context = canvasEl.getContext('2d');

    const mouseDown$ = fromEvent<MouseEvent>(canvasEl, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(canvasEl, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(canvasEl, 'mouseup');
    const mouseLeave$ = fromEvent<MouseEvent>(canvasEl, 'mouseleave');

    const subscription = mouseDown$
      .pipe(
        tap(({ offsetX: x, offsetY: y }) => {
          const message: DrawingSocketMessage = {
            state: 'begin',
            x,
            y,
          };
          socket?.emit(DRAWING_TOPIC, message);
        }),
        tap(({ offsetX, offsetY }) => {
          context?.beginPath();
          context?.moveTo(offsetX, offsetY);
        }),
        switchMap(() =>
          mouseMove$.pipe(
            takeUntil(mouseUp$),
            takeUntil(mouseLeave$),
            finalize(() => {
              const message: DrawingSocketMessage = {
                state: 'close',
                x: 0,
                y: 0,
              };
              socket?.emit(DRAWING_TOPIC, message);
              context?.closePath();
            })
          )
        ),
        tap(({ offsetX: x, offsetY: y }) => {
          const message: DrawingSocketMessage = {
            state: 'drawing',
            x,
            y,
          };
          socket?.emit(DRAWING_TOPIC, message);
        }),
        tap(({ offsetX, offsetY }) => {
          context?.lineTo(offsetX, offsetY);
          context?.stroke();
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [canvasRef, socket]);
}
