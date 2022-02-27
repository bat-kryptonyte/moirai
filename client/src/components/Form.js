import React, { useState, useEffect } from 'react';

import axios from 'axios';
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
  InputLeftAddon,
  InputRightAddon
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
    cypherbody: "",
    twitterSelected: false,
    facebookSelected: false,
    instagramSelected: false,
    redditSelected: false,
    linkedinSelected: false
  }

  let [user, setUser] = useState(userObj);

  function handleChange(name, e) {
    setUser({ ...user, [name]: e.target.value });
  }

  function handleSubmit() {
    setUser({ ...user, "cypherbody": encrypt(user.cypherbody) });

    // Todo: post userObj to database 
    axios.post(`http://localhost:8000/cypher`, { user })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  
  
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Some Basic Info</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>

            <FormControl mt= {6} isRequired>
              <FormLabel>Please Enter Your Full Name</FormLabel>
              <Input type="name_one" name="user_name" placeholder="Dohn Joe" onChange={(e) => handleChange("user_name", e)} />
            </FormControl>

            <FormControl mt={6} isRequired>
              <FormLabel>Please Enter Your Designated Heir's Full Name</FormLabel>
              <Input type="name_two" placeholder="Dane Joe" onChange={(e) => handleChange("heir_name", e)} />
            </FormControl>

            <FormControl mt={6} isRequired>
              <FormLabel>Please Enter Your Email</FormLabel>
              <Input type="email" placeholder="test@illinois.edu" onChange={(e) => handleChange("user_email", e)} />
            </FormControl>


            <FormControl mt={6} isRequired>
              <FormLabel>Please Enter Your Designated Heir's Email</FormLabel>
              <Input type="email" placeholder="test@illinois.edu" onChange={(e) => handleChange("heir_email", e)} />
            </FormControl>
            
            <FormControl mt = {6} as='fieldset' isRequired>
              <FormLabel as='legend'>Select Your Account Types</FormLabel>
              <CheckboxGroup colorScheme='green' >
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox value='twitter' onChange={() => handleChange("twitterSelected", true)}>Twitter</Checkbox>
                  <Checkbox value='facebook' onChange={() => handleChange("facebookSelected", true)}>Facebook</Checkbox>
                  <Checkbox value='instagram'onChange={() => handleChange("instagramSelected", true)}>Instagram</Checkbox>
                  <Checkbox value='reddit'onChange={() => handleChange("redditSelected", true)}>Reddit</Checkbox>
                  <Checkbox value='linkedin'onChange={() => handleChange("linkedinSelected", true)}>LinkedIn</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            
            <FormControl mt={6} isRequired>
              <FormLabel>Access key</FormLabel>
              <Input type="password" placeholder="*******" onChange={(e) => handleChange("cypherbody", e)} />
              <FormHelperText>Please remember to explain this text</FormHelperText>
            </FormControl>
            <Button width="full" mt={4} color='black'onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>

    </Flex>
  );
}