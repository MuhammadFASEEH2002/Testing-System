import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useCookies } from "react-cookie";
import HomeScreen from "./screens/HomeScreen";
import RegisterationScreen from "./screens/RegisterationScreen";
import LoginScreen from "./screens/LoginScreen";



function App() {
  // const [cookies] = useCookies();
  // if (!cookies?.token) {
  //   return (
  //     <>
  //       <Router>
  //         <Routes>
  //           <Route path="/" element={<Login />} />
  //         </Routes>
  //       </Router>
  //     </>
  //   );
  // } else {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/register" element={<RegisterationScreen />} />
            <Route path="/login" element={<LoginScreen />} />


            {/* <Route path="/view/:id" element={<View />} />
            <Route path="/login" element={<Login />} /> */}
          </Routes>
        </Router>
      </>
    );
  }
// }

export default App;