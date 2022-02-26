import React from 'react';
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
              <Input type="name_one" placeholder="Dohn Joe" />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Please Enter Your Designated Successor's Full Name</FormLabel>
              <Input type="name_two" placeholder="Dane Joe" />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" />
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
              <Input type="password" placeholder="*******" />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
        </Box>

      </Flex>
    );
  }