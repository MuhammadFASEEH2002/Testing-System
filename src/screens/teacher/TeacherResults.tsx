import { useParams } from "react-router";
import TeacherSidebar from "../../components/TeacherSidebar"
import api from "../../utils/api";
import { useCookies } from "react-cookie";
import { Text, useToast, Stack, HStack, Heading, Card, CardBody, Divider} from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function TeacherResults() {
    type TestResult = {
        _id: Object,
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
        firstName: string,
        lastName: string,
        email: string,
    }
    type Student = {
        firstName: string,
        lastName: string,
        email: string,
    };
    type Test = {
        testId: string,
        testName: string
    }
    const [testResult, setTestResult] = useState<TestResult[]>([]);
    const { id } = useParams<{ id: string }>();
    const [cookies] = useCookies();
    const toast = useToast()
    const teacherToken = cookies.teacherToken;
    async function viewResults() {
        try {
            const response = await api.post('/api/teacher-result-card', { teacherToken, id });
            if (response.data.status) {
                setTestResult(response.data.testresult)
            } else {
                toast({
                    title: "Auth Error",
                    description: response.data.message,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                });
                // setLoading(false);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        viewResults();
    }, []);
    return (
        <>
            <TeacherSidebar>
                {/* @ts-ignore */}
                <HStack alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"}>
                    {
                        testResult.map(result => (
                            <>
                                <Card width='30%' height="xs">
                                    <CardBody textAlign={"center"}>
                                        <Stack mt='6' spacing='3' alignItems={"center"} justifyContent={"center"}>
                                            <Heading size='md' fontSize='1xl'>Student Name: {result.student.firstName} {result.student.lastName}</Heading>
                                            <Text color='blue.600' >
                                                Marks Obtained: {}/{result.totalQuestions}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider />
                                </Card>
                                
                            </>

                        ))
                    }
                </HStack>

            </TeacherSidebar>
        </>
    )
}
