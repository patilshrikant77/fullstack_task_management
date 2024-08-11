import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './redux/store'; // Ensure the correct path
import App from './App'; // Ensure the correct path
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
