import { Input, Stack, FormLabel, HStack, Button, useToast, Spinner, Card, CardBody, Heading, Divider, CardFooter, ButtonGroup, Text } from "@chakra-ui/react"
import StudentSidebar from "../../components/StudentSidebar"
import { useEffect, useState } from "react"
import api from "../../utils/api";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";


export default function StudentAttemptTest() {
    type Test = {
        _id: Object,
        testId: string,
        testName: string,
        teacher: Teacher
    };
    type Teacher = {
        firstName: string
    }
    const [test, setTest] = useState<Test>();
    const [testAvailable, setTestAvailable] = useState(false);
    const [questionCount, setQuestionCount] = useState("");

    const [loading, setLoading] = useState(false);
    const [testid, setTestid] = useState(false);
    const [cookies] = useCookies();
    const studentToken = cookies.studentToken
    const toast = useToast()
    const handleInputChange = (event: any, setState: any) => {
        setState(event.target.value);
    };
    async function searchTest() {
        try {
            setLoading(true);
            if (testid) {
                const response = await api.post('/api/search-test', { testid, studentToken })
                if (response.data.status) {
                    toast({
                        title: "Test Found",
                        status: "success",
                        position: "top",
                        duration: 5000,
                        isClosable: true
                    })
                    setTest(response.data.test)
                    setLoading(false);
                    setTestAvailable(true);
                    setQuestionCount(response.data.questionCount)

                } else {
                    toast({
                        title: "Test Not Found",
                        description: response.data.message,
                        status: "error",
                        position: "top",
                        duration: 5000,
                        isClosable: true
                    })
                    setLoading(false);
                    setTestAvailable(false);

                }
            } else {
                toast({
                    title: "Empty Search Area",
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
                setLoading(false);
                setTestAvailable(false);

            }
        } catch (error) {
            toast({
                title: "Network Error",
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true
            })
            setLoading(false);
            setTestAvailable(false);


        }
    }
    useEffect(() => {
        // Effect function
    }, []);
    return (
        <>
            <StudentSidebar>
                {loading ? (<><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack></>) : (<>
                    <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                   
                        {testAvailable?(<>
                            <Card maxW='sm'>
                            <CardBody textAlign={"center"}>

                                <Stack mt='6' spacing='3'>
                                    <Heading size='md' fontSize='2xl'>{test?.testName}</Heading>
                                    <Text color='blue.600' >
                                        Test ID: {test?.testId}
                                    </Text>
                                    <Text color='blue.600' >
                                        Number of Questions: {questionCount}
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter alignItems={"center"} justifyContent={"center"}>
                                <ButtonGroup >


                                    <Button variant='solid' colorScheme='blue'>
                                        <Link to={`/login/student/attempt-test-view/${test?._id}`}> 
                                            Attempt
                                        </Link>
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card></>):(<>
                            <Stack width={"50%"}>
                            <FormLabel>Enter Test ID</FormLabel>
                            <HStack>
                                <Input placeholder="Enter your test id" onChange={(event) => handleInputChange(event, setTestid)}></Input>
                                <Button bgColor={"blue.400"} onClick={() => { searchTest() }}>Search</Button>
                            </HStack>
                        </Stack></>)}
                    </Stack>
                </>)}
            </StudentSidebar>
        </>
    )
}
