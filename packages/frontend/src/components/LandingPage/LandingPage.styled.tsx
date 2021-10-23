import styled from 'styled-components';
import { colorCodes } from '../../shared/style/colors';
import paperTexture from '../../shared/assets/img/paper-texture.jpeg';

export const LandingPageStyled = styled.div`
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
