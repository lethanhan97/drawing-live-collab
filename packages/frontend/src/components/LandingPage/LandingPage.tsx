import React from 'react';
import styled from 'styled-components';

import { colorCodes } from '../../shared/style/colors';
import paperTexture from '../../shared/assets/img/paper-texture.jpeg';
import Text from '../shared/Text';
import Input from '../shared/Input';
import Button from '../shared/Button';

const LandingPageStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colorCodes.lightMustard};
  border-left: solid 5vw ${colorCodes.white};
  border-right: solid 5vw ${colorCodes.white};

  z-index: 0;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-bottom: 20vh;

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
      <Text.DecorativeText style={zIndexReset}>drawing_me.</Text.DecorativeText>
      <Input.Text
        style={{ marginTop: '5vh', marginBottom: '5vh', ...zIndexReset }}
        placeholder="Your name?"
      ></Input.Text>
      <Button
        style={zIndexReset}
        mode="primary"
        onClick={() => console.log('sup')}
      >
        Let's go
      </Button>
    </LandingPageStyled>
  );
}
