import { RefObject, useEffect } from 'react';
import { fromEvent, tap, switchMap, takeUntil, finalize } from 'rxjs';

export function useDrawing(canvasRef: RefObject<HTMLCanvasElement>) {
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
        tap(({ offsetX, offsetY }) => {
          context?.beginPath();
          context?.moveTo(offsetX, offsetY);
        }),
        switchMap(() =>
          mouseMove$.pipe(
            takeUntil(mouseUp$),
            takeUntil(mouseLeave$),
            finalize(() => context?.closePath())
          )
        ),
        tap(({ offsetX, offsetY }) => {
          context?.lineTo(offsetX, offsetY);
          context?.stroke();
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [canvasRef]);
}
