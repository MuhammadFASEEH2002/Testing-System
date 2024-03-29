import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useCookies } from "react-cookie";
import HomeScreen from "./screens/HomeScreen";
import RegisterationScreen from "./screens/RegisterationScreen";
import LoginScreen from "./screens/LoginScreen";
import TeacherHome from "./screens/teacher/TeacherHome";
import StudentHome from "./screens/student/StudentHome";
import TeacherLogout from "./screens/teacher/TeacherLogout";
import StudentLogout from "./screens/student/StudentLogout";
import TeacherCreateTest from "./screens/teacher/TeacherCreateTest";
import TeacherMyTests from "./screens/teacher/TeacherMyTests";
import TeacherAddQuestion from "./screens/teacher/TeacherAddQuestion";
import TeacherViewTest from "./screens/teacher/TeacherViewTest";
import StudentAttemptTest from "./screens/student/StudentAttemptTest";
import StudentViewTest from "./screens/student/StudentViewTest";
import TeacherResults from "./screens/teacher/TeacherResults";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/register" element={<RegisterationScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/login/teacher/home" element={<TeacherHome/>} />
          <Route path="/login/teacher/create-test" element={<TeacherCreateTest/>} />
          <Route path="/login/teacher/my-tests" element={<TeacherMyTests/>} />
          <Route path="/login/teacher/add-question/:id" element={<TeacherAddQuestion/>} />
          <Route path="/login/teacher/view-test/:id" element={<TeacherViewTest/>} />
          <Route path="/login/teacher/view-test-result/:id" element={<TeacherResults/>} />
          <Route path="/login/teacher/logout" element={<TeacherLogout/>} />
          <Route path="/login/student/home" element={<StudentHome />}/>
          <Route path="/login/student/attempt-test" element={<StudentAttemptTest/>}/>
          <Route path="/login/student/attempt-test-view/:id" element={<StudentViewTest/>}/>
          <Route path="/login/student/logout" element={<StudentLogout/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;