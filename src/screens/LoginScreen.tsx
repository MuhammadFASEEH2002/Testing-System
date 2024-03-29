import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Radio, RadioGroup,
    useToast, Spinner
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api';
import { useCookies } from 'react-cookie'

export default function LoginScreen() {
    const [role, setRole] = useState<string>("teacher");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const toast = useToast()
    const navigate = useNavigate()
    const handleInputChange = (event: any, setState: any) => {
        setState(event.target.value);
    };

    const [cookies, setCookies] = useCookies();
    async function checkToken() {
        const teachertoken = cookies.teacherToken;
        const studenttoken = cookies.studentToken;

        if (teachertoken) {
            navigate('/login/teacher/home');

        } else if (studenttoken) {
            navigate('/login/student/home');
        } else {
            // console.log("no token")
        }

    }

    useEffect(() => {
        // Effect function
        checkToken()
    }, []);
    async function login() {
        try {
            setLoading(true);
            // console.log(role, email, password)
            if (role && email && password) {
                const response = await api.post('/api/login', { role, email, password })
                // console.log(response.data);
                if (response.data.status) {
                    toast({
                        title: "User Logged In",
                        status: "success",
                        position: "top",
                        duration: 5000,
                        isClosable: true
                    })
                    const expiryDate = new Date(); // Create a new Date object
                    expiryDate.setDate(expiryDate.getDate() + 7);
                    if (response.data.role == "teacher") {
                        setCookies('teacherToken', response.data.teacherToken, { expires: expiryDate, path: '/' });
                        navigate('/login/teacher/home')
                    } else {
                        setCookies('studentToken', response.data.studentToken, { expires: expiryDate, path: '/' });
                        navigate('/login/student/home')
                    }
                } else {
                    toast({
                        title: "Auth Error",
                        description: response.data.message,
                        status: "error",
                        position: "top",
                        duration: 5000,
                        isClosable: true
                    })
                    setLoading(false);
                }
            } else {
                toast({
                    title: "Empty Fields",
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
                setLoading(false);
            }
        } catch (error) {
            toast({
                title: "Network Error",
              
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true
            })
            navigate('/')
        }
    }
    return (
        <>
            {loading ? (<><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>) : (<>
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
                                        {/* <Checkbox>Remember me</Checkbox> */}
                                        <Text color={'blue.400'}>Forgot password?</Text>
                                    </Stack>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        onClick={() => login()}>
                                        Sign in
                                    </Button>
                                    <Text align={'center'}>
                                        Don't have an Account?<Link to={"/register"}>Sign Up</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </>)}

        </>
    )
}