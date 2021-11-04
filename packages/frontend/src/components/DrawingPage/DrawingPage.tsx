import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import UsernameContext from '../../shared/contexts/username.context';
import { paperShadowOuter } from '../../shared/style/box-shadow';
import { colorCodes } from '../../shared/style/colors';
import Cursor from './Cursor';
import { useCursor } from './hooks/useCursor';
import { useDrawing } from './hooks/useDrawing';

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
  cursor: none;
`;

function DrawableCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;

  useDrawing(canvasRef);
  const { x, y, shouldDisplay, cursorDisplay } = useCursor(canvasRef);

  return (
    <>
      <Cursor
        x={x}
        y={y}
        shouldDisplay={shouldDisplay}
        cursorDisplay={cursorDisplay}
      />
      <CanvasStyled
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </>
  );
}

export default function DrawingPage() {
  const usernameContext = useContext(UsernameContext);
  return (
    <DrawingPageStyled>
      <DrawableCanvas />
    </DrawingPageStyled>
  );
}
