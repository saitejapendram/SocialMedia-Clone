import axios from "axios"
import { useEffect, useState } from "react"
import { FriendComponent } from "../components/FriendComponent";

export const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const userFunc = async () => {
              const response = await axios.get(`http://127.0.0.1:3001/api/v2/user/allUsers`);
              setUsers(response.data.users);
              console.log("alright");

        }

        userFunc();
    },[])
    return (
        <div className="flex flex-col justify-around items-center pt-12 ">
            <div className="my-12 w-2/5 border bg-slate-200 shadow-xl rounded">
                  {users.map((user) => (
                    
                         <FriendComponent username={user.username} profilePicture={user.profilePicture} location={user.location} id={user._id}/>
                  ))}
            </div>
        </div>
    )
}