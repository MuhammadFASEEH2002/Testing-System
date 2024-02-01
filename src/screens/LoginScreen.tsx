'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Radio, RadioGroup,

} from '@chakra-ui/react'

import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginScreen() {
    const [role, setRole] = useState<string>("teacher");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleInputChange = (event: any, setState: any) => {
        setState(event.target.value);
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
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
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" required onChange={(event) =>
                                handleInputChange(event, setEmail)
                            } />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" required onChange={(event) =>
                                handleInputChange(event, setPassword)
                            } />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                            <Text align={'center'}>
                                Don't have an Account?<Link color={'blue.400'} to={"/register"}> Sign Up</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}