import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import { colorCodes } from '../../../shared/style/colors';

interface IText {
  DecorativeText: StyledComponent<'h1', any, {}, never>;
}

const DecorativeText = styled.h1`
  color: ${colorCodes.brown};
  font-size: 10vw;
  position: relative;

  &::before {
    content: ' ';
    position: absolute;
    bottom: -5%;
    left: 0;
    background-color: ${colorCodes.orange};
    width: 0;
    height: 20%;
    z-index: -1;

    transition: width 500ms ease;
  }

  &:hover:before {
    width: 100%;
  }
`;

const Text: IText = {
  DecorativeText,
};

export default Text;
