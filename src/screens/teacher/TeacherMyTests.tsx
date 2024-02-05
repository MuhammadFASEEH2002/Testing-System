import { useCookies } from 'react-cookie';
import TeacherSidebar from '../../components/TeacherSidebar'
import { useEffect, useState } from 'react';
import { Text, useToast, Stack, HStack, Heading, Card, CardBody, Divider, CardFooter, Button, ButtonGroup } from '@chakra-ui/react';
import api from '../../utils/api';
import { useNavigate } from 'react-router';

export default function TeacherMyTests() {
    type Test = {
        testId: string,
        testName: string,
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
        console.log(tests)
    }, []);
    async function getTest() {
        setLoading(true);
        const response = await api.post('/api/get-test', { teacherToken })
        if (response.data.status) {
            setTests(response.data.test);
            setLoading(false);
        } else {
            toast({
                title: "Authenthication Error",
                description: response.data.message,
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true
            })
            navigate('/login/teacher/home')

        }
    }


    return (
        <>

            <TeacherSidebar>
                {loading ? (
                    <></>
                ) : (
                    <HStack alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"} spacing='2'>
                        {tests.map(tests => (
                           
                                    <Card maxW='sm'>
                                        <Button variant='solid' colorScheme='pink'>
                                                    Delete
                                                </Button>
                                        <CardBody textAlign={"center"}>

                                            <Stack mt='6' spacing='3'>
                                                <Heading size='md'  fontSize='2xl'>{tests.testName}</Heading>
                                                <Text color='blue.600' >
                                                    Test ID: {tests.testId}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                        <Divider />
                                        <CardFooter>
                                            <ButtonGroup spacing='2'>
                                                <Button variant='ghost' colorScheme='blue'>
                                                    View Test
                                                </Button>
                                                <Button variant='solid' colorScheme='blue'>
                                                    Add Question
                                                </Button>
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
