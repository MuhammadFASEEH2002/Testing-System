import { FormControl, FormLabel, HStack, Stack, useColorModeValue, Radio, RadioGroup, VStack, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import api from '../utils/api';
// import { MdCheckCircle } from "react-icons/md";
// import { IoMdCloseCircle } from "react-icons/io";
// import api from '../utils/api';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router';

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


export default function TeacherQuestion({ question }: { question: Question }) {
    // const [cookies] = useCookies();
    const [correct, setCorrect] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
    setIsSubmitted(false)
    const [cookies] = useCookies();
    const studentToken = cookies.studentToken;
    // const teacherToken = cookies.teacherToken;
    const toast = useToast();
    // const navigate=useNavigate()
    async function submitQuestion(option: any, testId: any, question: any) {
        try {
            if (correct) {
                const response = await api.post('/api/result', { studentToken, option, testId, question });
                if (response.data.status) {

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
            }

        } catch (error) {

        }
    }
    // async function deleteQuestion(id: any) {
    //     try {
    //         const response = await api.post('/api/delete-question', { teacherToken, id });
    //         if (response.data.status) {
    //             toast({
    //                 title: "Question Deleted",
    //                 status: "success",
    //                 position: "top",
    //                 duration: 5000,
    //                 isClosable: true
    //             });
    //             navigate(`/login/teacher/my-tests`)

    //         } else {
    //             toast({
    //                 title: "Auth Error",
    //                 description: response.data.message,
    //                 status: "error",
    //                 position: "top",
    //                 duration: 5000,
    //                 isClosable: true
    //             });
    //             // setLoading(false);
    //         }
    //     } catch (error) {

    //     }
    // }
    console.log(correct)
    return (
        <>
            {isSubmitted ? (<></>) : (<>
                <Stack padding={"15px"} margin={"10px"} borderRadius={"10px"} bg={useColorModeValue('gray.50', 'gray.800')}>
                    <HStack>
                        <FormControl>
                            <FormLabel>{question.question}</FormLabel>
                        </FormControl>
                    </HStack>
                    {Object.values(question.options).map((option) => (<>
                        {/* @ts-ignore */}
                        <RadioGroup value={correct} onChange={setCorrect}>
                            <VStack alignItems={"flex-start"}>
                                {/* @ts-ignore */}
                                <Radio value={`${option?.text}~${option?.isCorrect}`}>{option?.text}</Radio>
                            </VStack>
                        </RadioGroup>
                    </>
                    ))}
                    {/* @ts-ignore */}

                    <Button onClick={() => { submitQuestion(correct, question.test, question.question) }}>Submit</Button>

                </Stack>
            </>)}

        </>
    )
}
