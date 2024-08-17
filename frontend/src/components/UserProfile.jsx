import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import post2 from "../assets/post2.jpeg";
import { userIdF } from "../storage/atom";


export const UserProfile = () => {

    const [profile1, setProfile1] = useState({});
    const userIdFV = useRecoilValue(userIdF)

    useEffect(() => {
        const profilefunc = async () => {

              const response = await axios.get(`http://127.0.0.1:3001/api/v2/user/realProfile`, {headers : {Authorization : "Bearer "+localStorage.getItem("token")}})

              setProfile1(response.data)

        }

        profilefunc();

    }, [])
    
    

    return (
        <div className="bg-slate-200 ml-12 mt-12 fixed w-80 rounded border shadow-xl">
             <div className="flex items-center">
                <img src={`http://127.0.0.1:3001/uploads/${profile1.profilePicture}`} alt="" className="rounded-full w-16 h-16 border-2 border-black ml-4 mt-4"/>
                <div className="ml-2 text-lg font-bold text-black ml-4">{profile1.username && profile1.username.toUpperCase()}</div>
            </div>
             <div className="p-2 text-lg font-semibold text-black space-y-2 ml-14 pl-6">
                 <div >{profile1.location}</div>
                 <div>{profile1.occupation}</div>
             </div>
             <div className="text-lg font-bold text-black ml-14 pl-6 pb-4">
                  impressions
             </div>
             
        </div>
    )
}