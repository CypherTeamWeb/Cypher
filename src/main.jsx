import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from './redux/store.js'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
)

// Создаю лого на вкладку
const logo = document.createElement('link');
const head = document.querySelector('head');

logo.setAttribute('rel', 'icon');
logo.setAttribute('href', '/img/Cypher Team Logo.png');

head.append(logo);

// Создаю название для вкладки
document.title = 'Cypher Team';