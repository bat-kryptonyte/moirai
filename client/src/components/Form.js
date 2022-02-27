import React, { useState, useEffect } from 'react';
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
import Accounts from './Accounts';

export default function Form() {
  var CryptoJS = require("crypto-js");

  function encrypt(data) {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'i love cs225').toString();
    return ciphertext;
  }

  const [inputList, setInputList] = useState([{ userName: "", passWord: "" }]);
  const [userData, setUserData] = useState("");

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

  let accountData = "";

  let [user, setUser] = useState(userObj);

  function handleChange(name, e) {
    setUser({ ...user, [name]: e.target.value });
  }

  async function handleSubmit() {
    await setUser({ ...user, "cypherbody": encrypt(user.cypherbody) });
    await setUser({ ...user, "cypherbody": user.cypherbody + encrypt(userData) });    // Todo: post userObj to database 
    /*
    axios.post(`http://localhost:8000/cypher`, { user })
    .then(res => {
      console.log(res);
    })
    */
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Some Basic Info</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>

            <FormControl mt={6} isRequired>
              <FormLabel>Please Enter Your Full Name</FormLabel>
              <Input type="name_one" placeholder="Dohn Joe" onChange={(e) => handleChange("user_name", e)} />
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

            {/* <FormControl mt = {6} as='fieldset' isRequired>
              <FormLabel as='legend'>Select Your Account Types</FormLabel>
              <CheckboxGroup colorScheme='green' >
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox value='twitter' >Twitter</Checkbox>
                  <Checkbox value='facebook' >Facebook</Checkbox>
                  <Checkbox value='instagram'>Instagram</Checkbox>
                  <Checkbox value='reddit'>Reddit</Checkbox>
                  <Checkbox value='linkedin'>LinkedIn</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl> */}
            {/* <Accounts data={accountData}/> */}
            {
              inputList.map((x, i) => {
                return (
                  <form className="accountForm" value={userData}>
                    <FormControl mt={6} isRequired>
                      <FormLabel>
                        Please enter your username for this account
                      </FormLabel>
                      <Input name="name" placeholder="bat-kryptonyte" defaultvalue={x.userName} onChange={e => handleInputChange(e, i)} />
                      <FormLabel mt={6}>
                        Please enter your password for this account
                      </FormLabel>
                      <Input type="password" name="password" placeholder="*******" defaultvalue={x.passWord} onChange={e => handleInputChange(e, i)} />
                      {inputList.length !== 1 && <Button color="black" onClick={() => handleRemoveClick(i)}>Remove this entry</Button>}
                      {inputList.length - 1 === i && <Button color="black" onClick={handleAddClick}>Add another account </Button>}
                    </FormControl>
                  </form>
                );
              })
            }

            <FormControl mt={6} isRequired>
              <FormLabel>Access key</FormLabel>
              <Input type="password" placeholder="*******" onChange={(e) => handleChange("cypherbody", e)} />
              <FormHelperText>Please remember to explain this text</FormHelperText>
            </FormControl>

            <Button width="full" mt={4} color='black' onClick={handleSubmit}>
              Create.
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}