import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import api from "../../utils/api";
import { useToast, Stack, Button, Spinner } from "@chakra-ui/react";
import StudentQuestion from "../../components/StudentQuestion";
export default function StudentViewTest() {
    type Question = {
        _id: Object,
        test: Test,
        question: string,
        options: Options
    };
    type Options = {
        text: string,
        isCorrect: Boolean
    }
    type Test = {
        testId: string,
        testName: string
    }
    const [cookies] = useCookies();
    const studentToken = cookies.studentToken;
    const [question, setQuestion] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);

    const { id } = useParams<{ id: string }>();
    const toast = useToast()
    const navigate = useNavigate()
    async function viewTest() {
        try {
            setLoading(true)
            const response = await api.post('/api/attempt-test-view', { studentToken, id });
            if (response.data.status) {
                setQuestion(response.data.question)
                setLoading(false)
            } else {
                toast({
                    title: "Auth Error",
                    description: response.data.message,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                });
                navigate("/login/student/attempt-test")
            }
        } catch (error) {
            toast({
                title: "Network Error",
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true
            })
            navigate("/login/student/attempt-test")

        }
    }
    useEffect(() => {
        viewTest();
    }, []);
    return (
        <>
            {loading ? (<><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack></>) : (<>
                <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                    {question.map(question => (
                        <>
                            <Stack width={{ base: "90%", md: "70%", lg: "50%" }}>
                                return <StudentQuestion question={question} />
                            </Stack>
                        </>
                    ))
                    }
                    <Button bgColor={"blue.400"} _hover={{ bgColor: "blue.500" }} onClick={() => { navigate("/login/student/attempt-test") }}>End Test</Button>
                </Stack></>)}

        </>
    )
}
