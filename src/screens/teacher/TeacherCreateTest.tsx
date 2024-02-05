import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    useToast,
    Spinner
} from '@chakra-ui/react'
import { useState } from 'react'
import TeacherSidebar from '../../components/TeacherSidebar'
import api from '../../utils/api'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

export default function TeacherCreateTest() {
    const [testid, setTestid] = useState<string>("")
    const [testname, setTestname] = useState<string>("");
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate= useNavigate();


    const handleInputChange = (event: any, setState: any) => {
        setState(event.target.value);
    };
    const [cookies] = useCookies();
    const teacherToken = cookies.teacherToken

    async function createTest() {
        setLoading(true);
        // console.log(role, email, password)
        if (testid && testname) {
            const response = await api.post('/api/create-test', { testid, testname,teacherToken })
            // console.log(response.data);
            if (response.data.status) {
                toast({
                    title: "Test Created",
                    status: "success",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
               navigate("/login/teacher/home")
            } else {
                toast({
                    title: "Authenthication Error",
                    description: response.data.message,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
                setLoading(false);
            }
        } else {
            toast({
                title: "Empty Fields",
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true
            })
            setLoading(false);
        }
    }
    return (<>
        <TeacherSidebar>
            {loading?(<><Stack minHeight={'100vh'} width={'100vw'} ><Spinner size='xl' /></Stack> </>):(<>
               <Flex
               align={'center'}
               justify={'center'}
           >
               <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                   <Stack align={'center'}>
                       <Heading fontSize={'4xl'} textAlign={'center'}>
                           Create your test
                       </Heading>
                   </Stack>
                   <Box
                       rounded={'lg'}
                       bg={useColorModeValue('white', 'gray.700')}
                       boxShadow={'lg'}
                       p={8}>
                       <Stack spacing={4}>
                           <FormControl id="email" isRequired>
                               <FormLabel>Test ID</FormLabel>
                               <Input type="text" onChange={(event) =>
                                   handleInputChange(event, setTestid)
                               } />
                           </FormControl>
                           <FormControl id="password" isRequired>
                               <FormLabel>Test Name</FormLabel>

                               <Input type="text" onChange={(event) =>
                                   handleInputChange(event, setTestname)
                               } />


                           </FormControl>
                           <Stack spacing={10} pt={2}>
                               <Button
                                   loadingText="Submitting"
                                   size="lg"
                                   bg={'blue.400'}
                                   color={'white'}
                                   _hover={{
                                       bg: 'blue.500',
                                   }}
                                   onClick={() => { createTest() }}>
                                   Create Test
                               </Button>
                           </Stack>

                       </Stack>
                   </Box>
               </Stack>
           </Flex>
            </>)}
         
        </TeacherSidebar>
        </>

    )
}