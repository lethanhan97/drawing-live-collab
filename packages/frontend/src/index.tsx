import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import ContextProvider from './shared/contexts/ContextProvider';
import GlobalStyle from './shared/style/DefaultStyle';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <GlobalStyle />
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
