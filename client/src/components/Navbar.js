
import React, { useEffect, useState } from "react";
import { Routes,Route } from "react-router";

import { Link } from "react-router-dom";
import styles from './style.css'; 
import Form from "./Form";
import SecondForm from "./SecondForm";
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Select,
    CheckboxGroup,
    Stack,
    Checkbox,
    InputGroup,
    FormHelperText,
    Collapse,
    InputLeftAddon,
    InputRightAddon
  } from '@chakra-ui/react';
export default function Navbar() {
   
 
  return (

    <div style={styles} >
    
        <div class="decors">
            <div><img src="decimal.png" id="decimal"/>
            <div><img src="clock.png" id="clock"/>
            <div><img src="key.png" id="key"/>
            <div><img src="bgpic.png" id="background"/>
        </div>
        <div class="buttons">
            <div id="deposit" >DEPOSIT!</div>
            <div id="retrieve">RETRIEVE?</div>
        </div>
        <div id="title">
            Moira
        </div>
        <div id="subtitle">
            <span id="line1">By passing your valuable digital presences </span>
            <span id="line2">to those you deemed worthy, </span>
            <span>you can be truly immortalized in the river of time.</span>
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>

  );
}