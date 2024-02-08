import StudentSidebar from "../../components/StudentSidebar"
import { Stack, Spinner, Text, useToast } from '@chakra-ui/react'
import api from "../../utils/api";
import { useEffect, useState } from "react";

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

export default function StudentHome() {
    type Student = {
        firstName: string,
        lastName: string,
        email: string,
      };
      const [student, setStudent] = useState<Student| undefined>();
      const [loading, setLoading] = useState(false);
      const [cookies] = useCookies();
      const toast = useToast()
      const navigate = useNavigate()
      const studentToken = cookies.studentToken
      async function getStudent() {
        try {
          setLoading(false);
          const response = await api.post('/api/get-student', { studentToken })
          if (response.data.status) {
            setStudent(response.data.student)
            setLoading(true);
    
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
        } catch (error) {
          toast({
            title: "Network Error",
    
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
          })
          navigate('/')
        }
    
      }
    
      useEffect(() => {
        getStudent();
      }, []);

    return (
        <>
        <StudentSidebar>
        {loading ? (<>
          <Stack width={'100%'} alignItems={"center"} justifyContent={"center"}>
            <Text fontSize={"2xl"} textAlign={"center"}>Welcome  {student?.firstName} {student?.lastName}</Text>
          </Stack>
        </>) : (
          <><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"}><Spinner size='xl' /></Stack> </>)}
      </StudentSidebar>
      </>
    )
}
