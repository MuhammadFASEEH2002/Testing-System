import { useState } from 'react'
import TeacherSidebar from '../../components/TeacherSidebar'
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Radio, RadioGroup, HStack, Button
} from '@chakra-ui/react'
export default function TeacherAddQuestion() {
    // const [loading, setLoading] = useState(false);
    const [numOptions, setNumOptions] = useState('2');
    
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const handleInputChange = (event: any, setState: any) => {
        setState(event.target.value);
    };
    const handleOutputChange = (
        event: any,
        index: number
    ) => {
        const newOptions: string[] = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };
    console.log(question)
    return (
        <>
            <TeacherSidebar>
                {/* {loading ? (<></>) : (<></>)} */}
                <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                    <Stack width={"50%"}>
                        <FormControl isRequired>
                            <FormLabel>Question</FormLabel>
                            <Input type='test' placeholder='Enter your question' onChange={(event) =>
                                handleInputChange(event, setQuestion)
                            } />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel as='legend'>
                                Select the number of options
                            </FormLabel>
                            <RadioGroup value={numOptions} onChange={setNumOptions}>
                                <HStack spacing='24px'>
                                    <Radio value='2'>2</Radio>
                                    <Radio value='4'>4</Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                        {numOptions && (
                            <FormControl isRequired>
                                <FormLabel>Options</FormLabel>
                                {Array.from({ length: parseInt(numOptions, 10) }, (_, index) => (
                                    <HStack>
                                        <Input
                                            key={index}
                                            type='text'
                                            placeholder={`Option ${index + 1}`}
                                            onChange={(event: any) =>
                                                handleOutputChange(event, index)
                                            }
                                            margin={"5px"}
                                            isRequired
                                        />
                                    </HStack>
                                ))}
                            </FormControl>
                        )}
                        <FormControl isRequired>
                            <FormLabel as='legend'>
                                Select the correct answer
                            </FormLabel>
                            <RadioGroup value={numOptions} onChange={setNumOptions}>
                                <HStack spacing='24px'>
                                    {/* {Array.from({ length: parseInt(numOptions, 10) }, (_, index) => (
                                        <Radio key={index} value={index + 1}>
                                            Option {index + 1}
                                        </Radio>
                                    ))} */}
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                        <Button variant='solid' colorScheme='blue'>
                            Add
                        </Button>
                        <pre>{JSON.stringify(options, null, 2)}</pre>
                    </Stack>
                </Stack>
            </TeacherSidebar >
        </>
    )
}

