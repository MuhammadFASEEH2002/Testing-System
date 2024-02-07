import { Stack, Spinner, Text, useToast } from '@chakra-ui/react'
import api from "../../utils/api";
import { useEffect, useState } from "react";
import TeacherSidebar from '../../components/TeacherSidebar'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

export default function TeacherHome() {
  type Teacher = {
    firstName: string,
    lastName: string,
    email: string,
  };
  const [teacher, setTeacher] = useState<Teacher | undefined>();
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();
  const toast = useToast()
  const navigate = useNavigate()
const teacherToken=cookies.teacherToken
  async function getTeacher() {
    try {
      setLoading(false);
      const response = await api.post('/api/get-teacher',{teacherToken})
      if (response.data.status) {
        setTeacher(response.data.teacher)
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
    getTeacher();
  }, []);
  return (
    <>
      <TeacherSidebar>
        {loading ? (<>
          <Text fontSize={"2xl"}>Welcome  {teacher?.firstName} {teacher?.lastName}</Text>
        </>) : (
          <><Stack minHeight={'100vh'} width={'100vw'} ><Spinner size='xl' /></Stack> </>)}
      </TeacherSidebar>
    </>
  )
}