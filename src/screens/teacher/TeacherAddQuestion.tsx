import { useState } from 'react';
import TeacherSidebar from '../../components/TeacherSidebar';
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Radio,
    RadioGroup,
    HStack,
    Button,
    useToast
} from '@chakra-ui/react';
import api from '../../utils/api';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';

export default function TeacherAddQuestion() {
    const [numOptions, setNumOptions] = useState('');
    const [correct, setCorrect] = useState("");
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<{ text: string; isCorrect: boolean }[]>([]);
    const toast = useToast();
    const [cookies] = useCookies();
    const { id } = useParams<{ id: string }>();
    const teacherToken = cookies.teacherToken;

    const handleInputChange = (event: any, setState: any) => {
        setState(event.target.value);
    };

    const handleOutputChange = (event: any, index: number) => {
        const newOptions = [...options];
        newOptions[index] = { text: event.target.value, isCorrect: index === parseInt(correct) };
        setOptions(newOptions);
    };

    async function addQuestion() {
        try {
            if (question && options.every(option => option.text.trim() !== '')) {
                const response = await api.post('/api/add-question', { question, options, teacherToken, id });
                if (response.data.status) {
                    toast({
                        title: "User Logged In",
                        status: "success",
                        position: "top",
                        duration: 5000,
                        isClosable: true
                    });
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
            } else {
                toast({
                    title: "Empty Fields",
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                });
            }
        } catch (error) {
            toast({
                title: "Network Error",
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true
            });
        }
    }

    return (
        <>
            <TeacherSidebar>
                <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                    <Stack width={"50%"}>
                        <FormControl isRequired>
                            <FormLabel>Question</FormLabel>
                            <Input type="test" placeholder="Enter your question" onChange={(event) => handleInputChange(event, setQuestion)} />
                        </FormControl>
                        <FormControl isRequired>
                            {numOptions === '' && (
                                <>
                                    <FormLabel as="legend">Select the number of options</FormLabel>
                                    <RadioGroup value={numOptions} onChange={setNumOptions}>
                                        <HStack spacing="24px">
                                            <Radio value="2">2</Radio>
                                            <Radio value="4">4</Radio>
                                        </HStack>
                                    </RadioGroup>
                                </>
                            )}
                        </FormControl>
                        {numOptions !== "" && (
                            <FormControl isRequired>
                                <FormLabel>Options</FormLabel>
                                {Array.from({ length: parseInt(numOptions, 10) }, (_, index) => (
                                    <HStack key={index}>
                                        <Input
                                            type="text"
                                            placeholder={`Option ${index + 1}`}
                                            onChange={(event: any) => handleOutputChange(event, index)}
                                            margin="5px"
                                            isRequired
                                        />
                                    </HStack>
                                ))}
                            </FormControl>
                        )}
                        {numOptions !== "" && (
                            <FormControl isRequired>
                                <FormLabel as="legend">Select the correct answer</FormLabel>
                                <RadioGroup value={correct} onChange={setCorrect}>
                                    <HStack spacing="24px">
                                        {Array.from({ length: parseInt(numOptions) }, (_, index) => (
                                            <Radio key={index + 1} value={(index + 1).toString()}>
                                                Option {index + 1}
                                            </Radio>
                                        ))}
                                    </HStack>
                                </RadioGroup>
                            </FormControl>
                        )}

                        <Stack alignItems="center" justifyContent="center">
                            <Button variant="solid" width="50%" colorScheme="blue" onClick={addQuestion}>
                                Add
                            </Button>
                        </Stack>
                        <pre>{JSON.stringify(options, null, 2)}</pre>
                    </Stack>
                </Stack>
            </TeacherSidebar>
        </>
    );
}
