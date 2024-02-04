import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
    Stack, Text , Button, Divider
} from '@chakra-ui/react'


export default function HomeScreen() {
    return (
        <>
            <Navbar>
            </Navbar>
            <Stack alignItems={"center"} justifyContent={"center"}>
                <Text fontSize={{ base: "md", md: "xl", lg: "3xl" }} width={"80%"} textAlign={"center"}>Testify is an innovative platform designed to facilitate seamless testing experiences for both students and teachers. With its user-friendly interface and robust features, Testify empowers users to create, administer, and evaluate multiple-choice question (MCQ) based tests.
                </Text>
                <Text fontSize={{ base: "md", md: "xl", lg: "3xl" }} width={"80%"} textAlign={"center"}>Whether you're a student seeking to test your knowledge or a teacher aiming to assess your students' understanding, Testify offers a streamlined solution for all your testing needs.</Text>
                <Divider />
                <Link to={"/login"}>
                    <Button
                        as={'a'}
                        display={{ base: 'inline-flex', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={700}
                        colorScheme='teal' size='lg' 
                >
                        Explore
                    </Button>
                </Link>
            </Stack>
         

        </>
    )
}

