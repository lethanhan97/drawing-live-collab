import React from 'react';
import styled from 'styled-components';

import { colorCodes } from '../../shared/style/colors';
import paperTexture from '../../shared/assets/img/paper-texture.jpeg';
import Text from '../shared/Text';

const LandingPageStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colorCodes.lightMustard};
  border: solid 3vw ${colorCodes.white};

  z-index: 0;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    z-index: 1;
    content: ' ';
    background-image: url(${paperTexture});
    background-blend-mode: screen;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default function LandingPage() {
  // Added because of the background image having pseudoelement with index 1
  const zIndexReset = { zIndex: 2 };
  return (
    <LandingPageStyled>
      <Text.DecorativeText style={zIndexReset}>drawingme</Text.DecorativeText>
    </LandingPageStyled>
  );
}
