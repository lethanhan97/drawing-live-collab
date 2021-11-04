import React, { useRef } from 'react';
import styled from 'styled-components';
import { paperShadowOuter } from '../../shared/style/box-shadow';
import { colorCodes } from '../../shared/style/colors';
import Cursor from './Cursor';
import { useCursor } from './hooks/useCursor';
import { useDrawing } from './hooks/useDrawing';
import { useMultiCursor } from './hooks/useWebsocketCursor';

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
  const multiCursors = useMultiCursor();
  const cursor = useCursor(canvasRef);

  return (
    <>
      <Cursor {...cursor} key={cursor.key} />
      {Object.keys(multiCursors).map((key) => {
        return <Cursor {...multiCursors[key]} key={key} />;
      })}
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
