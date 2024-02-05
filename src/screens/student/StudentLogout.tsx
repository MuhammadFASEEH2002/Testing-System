import { useEffect } from "react";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
// @ts-ignore
import Cookies from 'js-cookie';
export default function StudentLogout() {
  
    const navigate = useNavigate();
  const logout = async () => {
    Cookies.remove('studentToken')
    navigate('/login');
  }

  useEffect(() => {
    logout();
  }, []);

  return <></>;
}