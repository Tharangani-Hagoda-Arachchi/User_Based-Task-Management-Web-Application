import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />

      {/*Toast Container*/}
      <ToastContainer position='top-right' hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover theme='colored' />
    </Provider>
)
