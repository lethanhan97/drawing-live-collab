import React, { createContext, ReactChild, useState } from 'react';

interface UsernameState {
  username: string;
  setUsername: (username: string) => void;
}

const initialState: UsernameState = {
  username: '',
  setUsername: () => {},
};

const UsernameContext = createContext(initialState);
export const UsernameProvider = ({ children }: { children: ReactChild[] }) => {
  const [username, setUsername] = useState('');
  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameContext;
