// import { useParams } from "react-router"
import TeacherSidebar from "../../components/TeacherSidebar"
import { useEffect} from "react";
// import { useCookies } from "react-cookie";
// import api from "../../utils/api";

export default function TeacherViewTest() {
    // const [cookies] = useCookies();
    // const teacherToken = cookies.teacherToken;
    // const { id } = useParams<{ id: string }>();

    async function viewTest(){
        // const response = await api.post('/api/add-question', { teacherToken, id });

    }
    useEffect(() => {
        viewTest();
    
    }, []);
    return (
        <>
            <TeacherSidebar>
                <p>I am Test</p>
            </TeacherSidebar>
        </>
    )
}
