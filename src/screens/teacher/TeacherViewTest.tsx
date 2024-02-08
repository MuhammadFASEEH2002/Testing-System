import { useParams } from "react-router"
import TeacherSidebar from "../../components/TeacherSidebar"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import api from "../../utils/api";
import { useToast, Stack} from "@chakra-ui/react";
import TeacherQuestion from "../../components/TeacherQuestion";

export default function TeacherViewTest() {
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
    const teacherToken = cookies.teacherToken;
    const [question, setQuestion] = useState<Question[]>([]);

    const { id } = useParams<{ id: string }>();
    const toast = useToast()
    async function viewTest() {
        try {
            const response = await api.post('/api/view-test', { teacherToken, id });
            if (response.data.status) {
                // toast({
                //     title: "Question Created",
                //     status: "success",
                //     position: "top",
                //     duration: 5000,
                //     isClosable: true
                // });
                // navigate("/login/teacher/my-tests")
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
            <TeacherSidebar>
                {question.map(question => (

                    <>
                        <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Stack width={"50%"}>
                               
                                {/* <RadioGroup value={numOptions} onChange={setNumOptions}>
                                    <VStack spacing="24px">
                                        <Radio value="2">2</Radio>
                                        <Radio value="4">4</Radio>
                                    </VStack>
                                </RadioGroup> */}
                                return <TeacherQuestion question={question} />
                            </Stack>
                        </Stack>
                    </>
                ))

                }
            </TeacherSidebar>
        </>
    )
}
