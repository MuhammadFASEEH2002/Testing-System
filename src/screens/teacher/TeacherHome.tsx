import { Stack, Spinner, Text, useToast } from '@chakra-ui/react'
import api from "../../utils/api";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import TeacherSidebar from '../../components/TeacherSidebar'
import { useCookies } from 'react-cookie';
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
  // const navigate = useNavigate()
const teacherToken=cookies.teacherToken
  async function getTeacher() {
    setLoading(true);
    const response = await api.post('/api/get-teacher',{teacherToken})
    if (response.data.status) {
      setTeacher(response.data.teacher)


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
  }

  useEffect(() => {
    // Effect function
    getTeacher();
  }, []);
  return (
    <>
      <TeacherSidebar>
        {loading ? (<>
          <Text>{teacher?.firstName}</Text>
        </>) : (
          <><Stack minHeight={'100vh'} width={'100vw'} ><Spinner size='xl' /></Stack> </>)}
      </TeacherSidebar>
    </>
  )
}