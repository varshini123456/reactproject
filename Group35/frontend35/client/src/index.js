import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import sellerstore from './components/seller/sellerstore';
// import 'semantic-ui-css/semantic.min.css'
// import 'semantic-ui-react'


// sending store of sellerstore which contains all reducers for state management
ReactDOM.render(
  <React.StrictMode>
    <Provider store={sellerstore}>
      <App/>
      
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
