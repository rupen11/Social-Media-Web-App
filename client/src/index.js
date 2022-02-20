import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import SocialState from './context/SocialState';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocialState>
        <App />
      </SocialState>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
