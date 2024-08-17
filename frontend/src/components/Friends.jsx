import { useEffect, useState } from "react";
import axios from "axios";
import { FriendComponent } from "./FriendComponent";

export const Friends = () => {

    const [friends1, setFriends1] = useState([]);

    useEffect(() => {
        const profilefunc = async () => {

              const response = await axios.get("http://127.0.0.1:3001/api/v2/user/friends", {headers : {Authorization : "Bearer "+localStorage.getItem("token")}})

              setFriends1(response.data.friends)

        }

        profilefunc();

    }, [])

    return (
        <div dir="ltr" className="bg-slate-200 mt-12 fixed w-96 rounded border shadow-xl h-3/4">
            <div className="sticky top-0 z-16 flex justify-around text-2xl font-bold pt-4">FRIENDS</div>
            {friends1.map((friend, i) => (
                <FriendComponent key={i} id={friend._id} username={friend.username} profilePicture={friend.profilePicture} location={friend.location}/>
            ))}
        </div>
    )
}