import { useCookies } from 'react-cookie';
import TeacherSidebar from '../../components/TeacherSidebar'
import { useEffect, useState } from 'react';
import { Text, useToast, Stack, HStack, Heading, Card, CardBody, Divider, CardFooter, Button, ButtonGroup, Spinner } from '@chakra-ui/react';
import api from '../../utils/api';
import { useNavigate} from 'react-router';
import { Link } from 'react-router-dom';

export default function TeacherMyTests() {
    type Test = {
        _id: Object,
        testId: string,
        testName: string,
        isActive: boolean,
        teacher: Teacher
    };
    type Teacher = {
        firstName: string
    }
    const [cookies] = useCookies();
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(false);
    
    const toast = useToast();
    const navigate = useNavigate();
    const teacherToken = cookies.teacherToken
    useEffect(() => {
        getTest();
    }, []);
    async function getTest() {
        try {
            setLoading(true);
            const response = await api.post('/api/get-test', { teacherToken })
            if (response.data.status) {
                setTests(response.data.test);
                setLoading(false);
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
                navigate('/login/teacher/home')
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
    async function startTest(id:any) {
        try {
            const response = await api.post('/api/start-test', { teacherToken , id})
            if (response.data.status) {
                toast({
                    title: "Test Started",
                    status: "success",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
                getTest()
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
              
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
    async function stopTest(id:any) {
        try {
            const response = await api.post('/api/stop-test', { teacherToken , id})
            if (response.data.status) {
                toast({
                    title: "Test Stopped",
                    status: "success",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
                getTest()

            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
              
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

            <TeacherSidebar>
                {loading ? (
                    <><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>
                ) : (
                    <HStack alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"} spacing='2'>
                        {tests.map(tests => (

                            <Card maxW='sm'>
                                <Button variant='solid' colorScheme='pink'>
                                    Delete
                                </Button>
                                <CardBody textAlign={"center"}> 
                                {tests?.isActive?(<>
                                    <Button bgColor={"red.400"} onClick={()=>{stopTest(tests._id)}}>Stop</Button>

                                </>):(<>

<Button bgColor={"blue.400"} onClick={()=>{startTest(tests._id)}}>Start</Button>
                                </>)}
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md' fontSize='2xl'>{tests.testName}</Heading>
                                        <Text color='blue.600' >
                                            Test ID: {tests.testId}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                        {tests?.isActive?(<>

                                        </>):(
                                            <>

                                        <Button variant='ghost' colorScheme='blue'>
                                            <Link to={`/login/teacher/view-test/${tests._id}`}>
                                            View Test
                                            </Link>
                                        </Button>

                                        <Button variant='solid' colorScheme='blue'>
                                            <Link to={`/login/teacher/add-question/${tests._id}`}>
                                            Add Question
                                            </Link>
                                        </Button>
                                            </>
                                        )}
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        ))}
                    </HStack>

                )}
            </TeacherSidebar>
        </>
    )
}
