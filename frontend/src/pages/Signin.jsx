import { useState } from "react"
import { ButtonBox } from "../components/ButtonBox"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { WarningBox } from "../components/WarningBox"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { signinAtom, userIdF } from "../storage/atom"
import { useSetRecoilState } from "recoil"

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const setSignin = useSetRecoilState(signinAtom);
    const setUserIdF = useSetRecoilState(userIdF);

    const navigate = useNavigate();

        const handleSubmit = async () => {
        
            const response = await axios.post("http://127.0.0.1:3001/api/v2/auth/signin", {
                email : email,
                password : password,
            });
            
            if (response.data.token) {
                
                localStorage.setItem('token', response.data.token);
                setEmail("");
                setPassword("");
                setSignin("signin");
                setUserIdF(response.data.id);
                navigate("/dashboard");
            }

    }

    return (
        <div>
            <div className="flex flex-col justify-around items-center h-screen">
                <div className="bg-slate-200 text-black text-lg font-normal border shadow-xl py-8 px-16 rounded shadow-xl">
                    <div className="text-2xl font-bold text-center">Sign in</div>
                    <div className="text-lg font-semibold">Enter your credentials to Sign in</div>
                    <div>
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border shadow-xl rounded pl-2 py-1 my-2 ml-7"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border shadow-xl rounded pl-2 py-1 my-2 ml-7"/>
                    </div>
                    <button onClick={handleSubmit} className="border shadow-xl rounded my-2 px-6 py-1 ml-16 text-lg font-bold">Signin</button>
                    
                    <div className="text-lg font-semibold text-black">You don't have Account?<Link to="/signup"> Sign up</Link></div>
                </div>
            </div>
        </div>
    )
}