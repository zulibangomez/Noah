import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RuahApp } from './RuahApp';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './stote';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>

    <BrowserRouter>
    <RuahApp />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
