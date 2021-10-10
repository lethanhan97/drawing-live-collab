import styled from 'styled-components';
import { colorCodes } from '../../../shared/style/colors';

interface IInput {
  Text: (props: TextProps) => JSX.Element;
}

const InputText = styled.input.attrs({
  type: 'text',
})`
  font-size: 3vw;
  outline: none;
  border: none;

  background-color: ${colorCodes.darkGreen};
  color: ${colorCodes.lightMustard};
`;

const WrapperText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorCodes.darkGreen};
  box-shadow: 1px 2px 1px -1px #777;
  border-radius: 5px;
  height: 5vw;
  padding: 1vw;
  margin: 1vw 0;
`;
const CircleDecor = styled.div`
  display: block;
  width: 2vw;
  height: 2vw;
  margin-right: 1vw;
  border-radius: 1vw;
  box-shadow: inset 1px 1px 1px 0px rgb(0 0 0 / 50%),
    inset 0 0 0 25px ${colorCodes.lightMustard};
`;

interface TextProps {
  placeholder?: string;
  style?: any;
  onChange?: () => void;
  value?: string;
}

const Text = (props: TextProps) => {
  return (
    <WrapperText {...props}>
      <CircleDecor></CircleDecor>
      <InputText placeholder={props.placeholder}></InputText>
    </WrapperText>
  );
};

const Input: IInput = {
  Text,
};

export default Input;
