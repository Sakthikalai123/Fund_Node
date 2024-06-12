import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'rsuite/dist/rsuite.min.css' 
import "@fontsource/montserrat"
import "@fontsource/poppins"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Store from './Redux/store';
import { Provider } from 'react-redux';
import { Chart, registerables } from "chart.js"

Chart.register(...registerables);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(     
    <BrowserRouter>   
       <Provider store={Store}>
            <App />
       </Provider>   
    </BrowserRouter>
    );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
