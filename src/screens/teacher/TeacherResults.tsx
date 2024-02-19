import { useNavigate, useParams } from "react-router";
import TeacherSidebar from "../../components/TeacherSidebar"
import api from "../../utils/api";
import { useCookies } from "react-cookie";
import { Text, useToast, Stack, HStack, Heading, Card, CardBody, Divider, CardFooter, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function TeacherResults() {

    type TestResult = {
        _id: string,
        teacher: Teacher,
        student: Student,
        test: Test,
        totalQuestions: string,
        attemptedQuestions: [
            {
                question: string,
                selectedOption: string,
                isCorrect: boolean
            }
        ]
    }
    type Teacher = {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
    }
    type Student = {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
    };
    type Test = {
        _id: string,
        testId: string,
        testName: string
    }
    const [testResult, setTestResult] = useState<TestResult[]>([]);
    const [marks, setMarks] = useState([]);

    const { id } = useParams<{ id: string }>();
    const [cookies] = useCookies();
    const toast = useToast()
    const navigate=useNavigate()
    const teacherToken = cookies.teacherToken;
    const [loading, setLoading] = useState(false);

    async function viewResults() {
        try {
            setLoading(true);

            const response = await api.post('/api/teacher-result-card', { teacherToken, id });
            if (response.data.status) {
                setTestResult(response.data.testresult)
                setMarks(response.data.obtainedMarks)
                setLoading(false);
            } else {
                toast({
                    title: "Auth Error",
                    description: response.data.message,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                });
                setLoading(false);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        viewResults();
    }, []);
    async function deleteResult(resultid: string) {
        try {
            setLoading(true);

            const response = await api.post('/api/teacher-result-delete', { teacherToken, resultid });
            if (response.data.status) {
                toast({
                    title: "Response Deleted",
                    status: "success",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                });
                setLoading(false);
                viewResults()
            } else {
                toast({
                    title: "Auth Error",
                    description: response.data.message,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                });
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
            <TeacherSidebar>
                {loading ? (<><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack></>) : (<>
                    {/* @ts-ignore */}
                    {testResult.length>0 ? (<>
                        <HStack alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"} spacing='2'>
                        {
                            testResult.map((result, index) => (
                                <>
                                    <Card width='xs' height="xs">
                                        <CardBody textAlign={"center"}>
                                            <Stack mt='6' spacing='3' alignItems={"center"} justifyContent={"center"}>
                                                <Heading size='md' fontSize='1xl'>Student Name: {result.student.firstName} {result.student.lastName}</Heading>
                                                <Text color='blue.600' >
                                                    Marks Obtained: {marks[index]}/{result.totalQuestions}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                        <Divider />
                                        <CardFooter alignItems={"center"} justifyContent={"center"}>
                                            <Button onClick={() => { deleteResult(result._id) }}>Delete</Button>
                                        </CardFooter>
                                    </Card>
                                </>
                            ))
                        }
                    </HStack>
                    </>):(<><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Text>no results</Text></Stack></>)}
                   
                </>)}

            </TeacherSidebar>
        </>
    )
}
