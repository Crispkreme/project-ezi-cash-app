import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Middleware() {

  const navigate = useNavigate();

  useEffect(() => {
    const session = sessionStorage.getItem('session');
    console.log("it's working");
    if(!session) {
      navigate("/login");
    }
  },[]);
  return (
    <></>
  )
}