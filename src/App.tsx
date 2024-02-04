import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useCookies } from "react-cookie";
import HomeScreen from "./screens/HomeScreen";
import RegisterationScreen from "./screens/RegisterationScreen";
import LoginScreen from "./screens/LoginScreen";
import TeacherHome from "./screens/teacher/TeacherHome";
import StudentHome from "./screens/student/StudentHome";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/register" element={<RegisterationScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/login/teacher/home" element={<TeacherHome />} />
          <Route path="/login/student/home" element={<StudentHome />} />
        </Routes>
      </Router>
    </>
  );
}
// }

export default App;