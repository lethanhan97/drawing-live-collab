import React from 'react';
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

export default function DrawingPage() {
  return (
    <DrawingPageStyled>
      <CanvasStyled width={1000} height={1000} />
    </DrawingPageStyled>
  );
}
