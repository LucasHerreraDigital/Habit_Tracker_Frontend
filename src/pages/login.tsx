import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"


export const Login = ()=>{
    const {login} = useAuth();
    const navigate = useNavigate();


    const handleLogin = ()=>{
        
    }

    return(
        <div>
            <form>

            </form>
        </div>
    )
} 