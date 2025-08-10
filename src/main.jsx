import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProductsProvider } from './context/ProductsContext';
//import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ProductsProvider>
        <App />
      </ProductsProvider>
   
  </React.StrictMode>
)
