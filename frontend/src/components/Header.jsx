import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinAtom } from "../storage/atom";
import { useRecoilState, useRecoilValue } from "recoil";


export const Header = () => {

    const [bar, setBar] = useState("dashboard");
    const [signin, setSignin ] = useRecoilState(signinAtom);
    const navigate = useNavigate();

    const handleSignin = () => {
        if (signin === "signin") {
            localStorage.removeItem("token");
            setSignin("signout")
            navigate("/signin");
            return;
        }
        else {
            
            setSignin("signin");
            navigate("/signin");
            return;
            


        }
    }

    return (
        <div className="fixed w-full bg-slate-200 flex justify-around items-center py-4 border-b border-black shadow-lg">
            <div className="text-3xl font-bold text-black shadow-xl px-2">
                SOCIALPEDIA
            </div>
            <div className={signin !== "signin" ? "hidden" : "flex space-x-4 text-lg text-black font-semibold"}>
                <button onClick={() => setBar("dashboard")} className={bar === "dashboard" ? "border-b-2 border-black" : ""}><Link to="/dashboard">Dashboard</Link></button>
                <button onClick={() => setBar("profile")} className={bar === "profile" ? "border-b-2 border-black" : ""}><Link to="/profile">Profile</Link></button>
                <button onClick={() => setBar("users")} className={bar === "users" ? "border-b-2 border-black" : ""}><Link to="/users">Users</Link></button>
                <button onClick={() => setBar("friendsPage")} className={bar === "friendsPage" ? "border-b-2 border-black" : ""}><Link to="/friendsPage" >Friends</Link></button>
            </div>
            {signin === "signin" ? <button onClick={handleSignin} className="text-lg font-bold text-black border border-black rounded shadow-lg px-3">
                 Sign out
            </button> : 
            <button onClick={handleSignin} className="text-lg font-bold text-black border border-black shadow-lg rounded  px-3">
                 Sign in
       </button>}
        </div>
    )
}