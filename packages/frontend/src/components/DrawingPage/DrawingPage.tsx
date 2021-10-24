import React, { useEffect, useRef } from 'react';
import { finalize, fromEvent, switchMap, takeUntil, tap } from 'rxjs';
import styled from 'styled-components';
import { paperShadowOuter } from '../../shared/style/box-shadow';
import { colorCodes } from '../../shared/style/colors';

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
`;

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
          console.log('mousedown');
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
          console.log('mouse moving');
          context?.lineTo(offsetX, offsetY);
          context?.stroke();
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [canvasRef]);

  return (
    <CanvasStyled ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
  );
}

export default function DrawingPage() {
  return (
    <DrawingPageStyled>
      <DrawableCanvas />
    </DrawingPageStyled>
  );
}
