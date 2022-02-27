import React, { useState } from "react";
// import axios from 'axios';
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

export default function Accounts(data) {

  var CryptoJS = require("crypto-js");

  function encrypt(data) {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'i love cs225').toString();
    return ciphertext;
  }

  const [inputList, setInputList] = useState([{ userName: "", passWord: "" }]);
  const [userData, setUserData] = useState(data);

  // handle input change
  const handleInputChange = async (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    await setInputList(list);
    await setUserData(encrypt(list));
  };
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { userName: "", passWord: "" }]);
  };
  
  return (
    inputList.map((x, i) => {
      return (
        <form className="accountForm" value={userData}>
          <FormControl mt = {6} isRequired>
            <FormLabel> 
              Please enter your username for this account 
            </FormLabel>
            <Input name="name" placeholder="bat-kryptonyte" defaultvalue={x.userName} onChange={e => handleInputChange(e, i)}/>
              <FormLabel mt = {6}>
                Please enter your password for this account
              </FormLabel>
              <Input type="password" name="password" placeholder="*******" defaultvalue={x.passWord} onChange={e => handleInputChange(e, i)}/>
                  {inputList.length !== 1 && <Button color = "black" onClick={() => handleRemoveClick(i)}>Remove this entry</Button>}
                  {inputList.length - 1 === i && <Button color = "black" onClick={handleAddClick}>Add another account </Button>}
          </FormControl>
        </form>    
      );
    })
  );
}