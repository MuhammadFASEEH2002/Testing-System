import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
    Stack, Text , Button
} from '@chakra-ui/react'
import Footer from '../components/Footer'

export default function HomeScreen() {
    return (
        <>
            <Navbar>
            </Navbar>
            <Stack alignItems={"center"} justifyContent={"center"}>
                <Text fontSize={{ base: "md", md: "xl", lg: "3xl" }} width={"80%"} textAlign={"center"}>TestIT is an innovative platform designed to facilitate seamless testing experiences for both students and teachers. With its user-friendly interface and robust features, Testify empowers users to create, administer, and evaluate multiple-choice question (MCQ) based tests.
                </Text>
                <Text fontSize={{ base: "md", md: "xl", lg: "3xl" }} width={"80%"} textAlign={"center"}>Whether you're a student seeking to test your knowledge or a teacher aiming to assess your students' understanding, TestIT offers a streamlined solution for all your testing needs.</Text>
                <Link to={"/login"}>
                    <Button
                        as={'a'}
                        display={{ base: 'inline-flex', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={700}
                        colorScheme='teal' 
                        size='lg' 
                        margin={"10px"}
                >
                        Explore
                    </Button>
                </Link>
                {/* Date().split(" ")[3] */}
            </Stack>
         <Footer></Footer>

        </>
    )
}

