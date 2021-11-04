import { RefObject, useEffect, useState } from 'react';
import { fromEvent, map, merge, Observable, tap } from 'rxjs';
import { CursorProps } from '../Cursor';

interface CursorCustomEvent {
  eventType: 'mouseMove' | 'mouseLeave';
  eventPayload: MouseEvent;
}

export function useCursor(canvasRef: RefObject<HTMLCanvasElement>) {
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
            setCursorDisplayState((prevState) => ({
              ...prevState,
              shouldDisplay: false,
            }));
          } else {
            const { clientX: x, clientY: y } = eventPayload;
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
  }, [canvasRef]);

  return cursorDisplayState;
}
