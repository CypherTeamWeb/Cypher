import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from './redux/store.js'
import { CookiesProvider } from 'react-cookie';

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <BrowserRouter>
      <Provider store={store}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <App />
      </CookiesProvider>
      </Provider>
    </BrowserRouter>,
)

// Создаю лого на вкладку
const logo = document.createElement('link');
const head = document.querySelector('head');

logo.setAttribute('rel', 'icon');
logo.setAttribute('href', '/img/Cypher Team Logo.png');

head?.append(logo);

document.title = 'Cypher Team';