import styled from 'styled-components';
import { colorCodes } from '../../../shared/style/colors';

type ButtonModes = 'primary' | 'secondary';

interface ButtonProps {
  mode: ButtonModes;
  children: string;
}

const getButtonColor = (mode: ButtonModes) => {
  switch (mode) {
    case 'primary':
      return colorCodes.red;
    case 'secondary':
      return colorCodes.darkGreen;
  }
};

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => getButtonColor(props.mode)};
  outline: none;
  border: none;
  font-size: 4vw;
  padding: 1vw;
  color: ${colorCodes.white};
  box-shadow: 0px 0px 0px 0px ${colorCodes.black};
  transform: translate(0px, 0px);

  transition: 500ms box-shadow, 500ms transform, 500ms color;

  position: relative;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 25px 0px -6px ${colorCodes.black};
    transform: translate(0px, -25px);
  }

  &:active {
    box-shadow: 0px 15px 0px -2px ${colorCodes.black};
    transform: translate(0px, -15px);
  }

  &::after {
    box-sizing: border-box;
    content: ${(props) => `"${props.children}"`};
    background-color: ${colorCodes.orange};
    color: ${colorCodes.darkGreen};
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    padding: 1vw;
    width: 100%;
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);

    transition: 500ms clip-path;
  }

  &:hover::after {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
`;

export default Button;
