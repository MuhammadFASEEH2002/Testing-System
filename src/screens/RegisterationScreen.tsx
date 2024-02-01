'use client'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Radio, RadioGroup, useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function RegisterationScreen() {
  const [role, setRole] = useState<string>("teacher");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (event: any, setState: any) => {
    setState(event.target.value);
  };

  const toast=useToast();
  async function registeration() {
    console.log(role, firstName, lastName, email, password)
    if (role && firstName && lastName && email && password) {
      const response = await axios.post('/api/register', { role, firstName, lastName, email, password })
      if (response.status) {
        toast({
          title: "User Registered",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true
        })
      }else{
        toast({
          title: "Authenthication Error",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true
        })
      }
    } else {
      toast({
        title: "Empty Fields",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true
      })
    }
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Select Role:</FormLabel>
              <RadioGroup defaultValue='2' onChange={setRole}
                value={role}>
                <Stack spacing={5} direction='row'>
                  <Radio colorScheme='blue' value='teacher'>
                    Teacher
                  </Radio>
                  <Radio colorScheme='blue' value='student'>
                    Student
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" onChange={(event) =>
                    handleInputChange(event, setFirstName)
                  } />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={(event) =>
                    handleInputChange(event, setLastName)
                  } />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(event) =>
                handleInputChange(event, setEmail)
              } />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(event) =>
                  handleInputChange(event, setPassword)
                } />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={() => registeration()}>
                Sign up

              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} to={"/login"} >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}