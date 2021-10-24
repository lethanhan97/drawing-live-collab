import React, { useEffect, useRef, useState } from 'react';
import {
  finalize,
  fromEvent,
  map,
  merge,
  Observable,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import styled from 'styled-components';
import { paperShadowOuter } from '../../shared/style/box-shadow';
import { colorCodes } from '../../shared/style/colors';
import Cursor, { CursorProps } from './Cursor';

const DrawingPageStyled = styled.div`
  background-color: ${colorCodes.lightMustard};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CanvasStyled = styled.canvas`
  background-color: white;
  box-shadow: ${paperShadowOuter};
  /* cursor: none; */
`;

interface CursorCustomEvent {
  eventType: 'mouseMove' | 'mouseLeave';
  eventPayload: MouseEvent;
}

function DrawableCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;

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

  const [cursorDisplayState, setCursorDisplayState] = useState<CursorProps>({
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

  const { x, y, shouldDisplay } = cursorDisplayState;
  return (
    <>
      <Cursor x={x} y={y} shouldDisplay={shouldDisplay} />
      <CanvasStyled
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </>
  );
}

export default function DrawingPage() {
  return (
    <DrawingPageStyled>
      <DrawableCanvas />
    </DrawingPageStyled>
  );
}
