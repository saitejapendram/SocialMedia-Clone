import { useNavigate } from "react-router-dom"
import { ButtonBox } from "../components/ButtonBox"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { WarningBox } from "../components/WarningBox"
import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom"

export const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [occupation, setOccupation] = useState("");
    


    const handleSubmit = async () => {
        
        const response = await axios.post("http://127.0.0.1:3001/api/v2/auth/signup", {
            email : email,
            username : username,
            password : password,
            location : location,
            occupation : occupation
        });
        

        if (response.data) {
            setEmail("");
            setUsername("");
            setPassword("");
            setLocation("");
            setOccupation("");
            navigate("/signin");
        }
        

    }
    return (<div>
        <div className="flex flex-col justify-around items-center h-screen">
            <div className="bg-slate-200 text-black text-lg font-normal border shadow-xl py-4 px-16 rounded shadow-xl mt-10">
                <div className="text-2xl font-bold text-center">Sign up</div>
                <div className="text-lg font-semibold">Enter your credentials to sign up</div>
                <div>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border shadow-xl rounded my-2 ml-7 pl-2 py-1"/>
                </div>
                <div> 
                    <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} className="border shadow-xl rounded my-2 ml-7 pl-2 py-1"/>
                </div>
                <div>
                    <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="border shadow-xl rounded my-2 ml-7 pl-2 py-1"/>
                </div>
                <div>
                    <input type="text" placeholder="occupation" onChange={(e) => setOccupation(e.target.value)} className="border shadow-xl rounded my-2 ml-7 pl-2 py-1"/>
                </div>
                <div>
                    <input type="text" placeholder="location" onChange={(e) => setLocation(e.target.value)} className="border shadow-xl rounded my-2 ml-7 pl-2 py-1"/>
                </div>
                <button onClick={handleSubmit} className="border shadow-xl rounded my-2 px-6 py-1 ml-16">Signup</button>
                <div className="text-lg font-semibold text-black">Already you have Account?<Link to="/signin"> Sign in</Link></div>
            </div>
        </div>
    </div>
        
    )
}