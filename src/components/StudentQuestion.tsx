import { FormControl, FormLabel, HStack, Stack, useColorModeValue, Radio, RadioGroup, VStack, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import api from '../utils/api';

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

    const [correct, setCorrect] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [cookies] = useCookies();
    const studentToken = cookies.studentToken;
    const toast = useToast();
    async function submitQuestion(option: any, testId: any, question: any) {
        try {
            if (correct) {
                const response = await api.post('/api/result', { studentToken, option, testId, question });
                if (response.data.status) {
                    setIsSubmitted(true)

                } else {
                    toast({
                        title: "Auth Error",
                        description: response.data.message,
                        status: "error",
                        position: "top",
                        duration: 5000,
                        isClosable: true
                    });
                }
            }
        } catch (error) {
            toast({
                title: "Network Error",
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true
            })
        }
    }
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
