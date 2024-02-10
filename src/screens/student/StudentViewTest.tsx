import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import api from "../../utils/api";
import { useToast, Stack, Button } from "@chakra-ui/react";
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

    const { id } = useParams<{ id: string }>();
    const toast = useToast()
    async function viewTest() {
        try {
            const response = await api.post('/api/attempt-test-view', { studentToken, id });
            if (response.data.status) {
                setQuestion(response.data.question)
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
        viewTest();
    }, []);
    return (
        <>
         
                <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                {question.map(question => (

                    <>
                            <Stack  width={{ base: "90%", md: "70%", lg: "50%" }}>

                                {/* <RadioGroup value={numOptions} onChange={setNumOptions}>
                                    <VStack spacing="24px">
                                        <Radio value="2">2</Radio>
                                        <Radio value="4">4</Radio>
                                    </VStack>
                                </RadioGroup> */}
                                return <StudentQuestion question={question} />
                            </Stack>

                    </>
                ))
                
            }
            <Button bgColor={"blue.400"}>End Test</Button>
            </Stack>
        </>
    )
}
