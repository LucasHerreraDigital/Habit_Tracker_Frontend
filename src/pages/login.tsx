import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"
import { loginUser } from "../api/Auth";
import { useState } from "react";


export const Login = ()=>{
    const {login} = useAuth();
    const navigate = useNavigate();

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const handleLogin = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            const data = await loginUser(email,password)
            login(data.token)         
            navigate("/")

        }catch(err: any){
            console.error(err.message)
        }
    }

    return(
         <div>
            <form onSubmit={handleLogin}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
} 