import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routing';
import {AuthProvider} from './AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from './Header';
import Footer from './Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   < AuthProvider>
   <Title/>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <Footer/>
    </ AuthProvider>
  </React.StrictMode>
);
