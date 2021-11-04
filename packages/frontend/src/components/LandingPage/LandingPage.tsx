import React, { useContext, useState } from 'react';

import Text from '../shared/Text';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { LandingPageStyled } from './LandingPage.styled';
import { useHistory } from 'react-router-dom';
import UsernameContext from '../../shared/contexts/username.context';

export default function LandingPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const usernameContext = useContext(UsernameContext);

  const handleLoginBtn = () => {
    usernameContext.setUsername(username);
    history.push('/drawing');
  };

  // Added because of the background image having pseudoelement with index 1
  const zIndexReset = { zIndex: 2 };
  return (
    <LandingPageStyled>
      <Text.DecorativeText style={zIndexReset}>drawing_me.</Text.DecorativeText>
      <Input.Text
        style={{ marginTop: '5vh', marginBottom: '5vh', ...zIndexReset }}
        placeholder="Your name?"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></Input.Text>
      <Button style={zIndexReset} mode="primary" onClick={handleLoginBtn}>
        Let's go
      </Button>
    </LandingPageStyled>
  );
}
