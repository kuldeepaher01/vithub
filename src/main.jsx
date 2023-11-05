import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.css'

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render( <BrowserRouter>
  <ChakraProvider>
    <App />
  </ChakraProvider>
</BrowserRouter>);

