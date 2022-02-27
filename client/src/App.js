import logo from './logo.svg';
// import axios from "axios";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import Accounts from './components/Accounts';
import React, { useEffect, useState } from "react";
import './App.css';

import { ChakraProvider, theme } from '@chakra-ui/react'
import Form from './components/Form';
import SecondForm from './components/SecondForm';

function App() {
  return (

    <ChakraProvider theme={theme}>
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="deposit" element={<Form />} />
      <Route path="retrieve" element={<SecondForm />} />
    </Routes>
  </BrowserRouter>

      </header>
    </div>

    </ChakraProvider>
  );
}

export default App;
