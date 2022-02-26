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
  CheckboxGroup,
  Stack,
  Checkbox,
  FormHelperText
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

            <FormControl mt= {6} isRequired>
              <FormLabel>Please Enter Your Full Name</FormLabel>
              <Input type="name_one" placeholder="Dohn Joe" />
            </FormControl>

            <FormControl mt={6} isRequired>
              <FormLabel>Please Enter Your Designated Successor's Full Name</FormLabel>
              <Input type="name_two" placeholder="Dane Joe" />
            </FormControl>

            <FormControl mt={6} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" />
            </FormControl>
            
            <FormControl mt = {6} as='fieldset' isRequired>
              <FormLabel as='legend'>Select Your Account Types</FormLabel>
              <CheckboxGroup colorScheme='green' >
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox value='twitter'>Twitter</Checkbox>
                  <Checkbox value='facebook'>Facebook</Checkbox>
                  <Checkbox value='instagram'>Instagram</Checkbox>
                  <Checkbox value='reddit'>Reddit</Checkbox>
                  <Checkbox value='linkedin'>LinkedIn</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Access key</FormLabel>
              <Input type="password" placeholder="*******" />
            </FormControl >
            <Button width="full" mt={8} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
        </Box>

      </Flex>
    );
  }