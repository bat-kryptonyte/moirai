import React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormHelperText
} from '@chakra-ui/react';

export default function SecondForm() {
    return (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Claim Your Accounts</Heading>
          </Box>
          <Box my={4} textAlign="left">
          <form>

            <FormControl isRequired>
              <FormLabel>Please Enter Your Full Name</FormLabel>
              <Input type="sName" placeholder="Dohn Joe" />
            </FormControl>

            <FormControl mt={6} isRequired>
              <FormLabel>Please Enter Your Account's Predecessor's Full Name</FormLabel>
              <Input type="pName" placeholder="Dane Joe" />
            </FormControl>

            <FormControl mt={6} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" />
              <FormHelperText>Please Verify Your Email</FormHelperText>
            </FormControl>
            
            <FormControl mt={6} isRequired>
              <FormLabel>Please verify your access key</FormLabel>
              <Input type="password" placeholder="*******" />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Claim Your Information
            </Button>
          </form>
        </Box>
        </Box>

      </Flex>
    );
  }