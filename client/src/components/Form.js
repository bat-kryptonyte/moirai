import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select
} from '@chakra-ui/react';

export default function Form() {
  var CryptoJS = require("crypto-js");

  function encrypt(data) {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'i love cs225').toString();
    return ciphertext;
  }

  // default object, might want to retrieve from database
  let userObj = {
    user_name: "",
    heir_name: "",
    heir_email: "",
    user_email: "",
    death_certificate: null,
    cypherbody: ""
  }

  let [user, setUser] = useState(userObj);

  function handleChange(name, e) {
    setUser({ ...user, [name]: e.target.value });
  }

  function handleSubmit() {
    setUser({ ...user, "cypherbody": encrypt(user.cypherbody) });
    // Todo: post userObj to database 
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Some Basic Info</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>

            <FormControl>
              <FormLabel>Please Enter Your Full Name</FormLabel>
              <Input type="name_one" name="user_name" placeholder="Dohn Joe" onChange={(e) => handleChange("user_name", e)} />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Please Enter Your Designated Successor's Full Name</FormLabel>
              <Input type="name_two" placeholder="Dane Joe" onChange={(e) => handleChange("heir_name", e)} />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" onChange={(e) => handleChange("user_email", e)} />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Select Your Account Types</FormLabel>
              <Select placeholder='Select option'>
                <option value='option1'>Twitter</option>
                <option value='option2'>Facebook</option>
                <option value='option3'>LinkedIn</option>
                <option value='option3'>Reddit</option>
                <option value='option3'>Instagram</option>
              </Select>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Access key</FormLabel>
              <Input type="password" placeholder="*******" onChange={(e) => handleChange("cypherbody", e)} />
            </FormControl>
            <Button width="full" mt={4} onClick={handleSubmit}>
              Sign In
            </Button>
          </form>
        </Box>
      </Box>

    </Flex>
  );
}