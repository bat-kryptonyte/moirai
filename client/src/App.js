import logo from './logo.svg';

import React, { useEffect, useState } from "react";
import './App.css';

import { ChakraProvider, theme } from '@chakra-ui/react'
import Form from './components/Form';

function App() {
  return (

    <ChakraProvider theme={theme}>
    <div className="App">
      <header className="App-header">
        <Form/>
        
      </header>
    </div>

    </ChakraProvider>
  );
}

export default App;
