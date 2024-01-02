import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
const { store, persistor } = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate  loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  
);
reportWebVitals();
