import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.scss';
import {store, persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  {/* it is the application we wrap around in the BrowserRouter so BrowserRouter
  knows where we are in the path of our application and we can navigate more easily  */}
  <Provider store={store}>
     {/* loading = {component} it is the component which will be rendered onto the 
    screeen while the persistor is doing it's task of rendering on the screen */}
    <PersistGate loading= {null} persistor={persistor}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
