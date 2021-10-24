import React, { useRef } from 'react';
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
  const canvasRef = useRef(null);
  const CANVAS_WIDTH = 1000;
  const CANVAS_HEIGHT = 1000;

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
