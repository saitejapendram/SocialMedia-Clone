import axios from "axios";
import post2 from "../assets/post2.jpeg";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userIdF } from "../storage/atom";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/solid";


export const FriendComponent = ({username, location, id, profilePicture}) => {

    const [friend, setFriend] = useState(false);
    const friendV = useRecoilValue(userIdF)

    const handleRemove = async () => {
          const response = await axios.put(`http://127.0.0.1:3001/api/v2/user/removeFriend?friendId=${id}`);
          
          return;
    }

    useEffect(() => {
        const fetchFriends = async () => {
              const res = await axios.get(`http://127.0.0.1:3001/api/v2/user/profile?id=${id}`,
                {
                    headers : {
                        'Authorization' : "Bearer " + localStorage.getItem('token')
                    }
                }
              );
              const boolF = res.data.friends.some((id) => {console.log(id);return id === friendV})
              
              setFriend(boolF);

        }
        fetchFriends();

    },[id]);

    const handleAddFriend = async () => {
        const res = await axios.get(`http://127.0.0.1:3001/api/v2/user/friend?friendId=${id}`,
            {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem('token')
                }
            }
        ); 
        if (!res.data.user) {
            return alert("Error while adding friend!")

        }
    }

    const handleRemoveFriend = async () => {
        const res = await axios.put(`http://127.0.0.1:3001/api/v2/user/removeFriend?friendId=${id}`,{},
            {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem('token')
                }
            }
        ); 
        if (!res.data.user) {
            return alert("Error while adding friend!")

        }
    }




    return (
        <div className="bg-slate-200 flex items-center justify-between text-lg font-semibold text-black my-4 mx-10 border-b pb-4 border-black" >
            <div className="flex gap-2 items-center">

            
               <img src={`http://127.0.0.1:3001/uploads/${profilePicture}`} alt="" className="w-16 h-16 rounded-full border-black border-2 border-black"/>
               <div className="w-32 ml-4 ">
                    <div className="text-lg font-bold text-black">{username.toUpperCase()}</div>
                    <div className="text-xs">{location.toUpperCase()}</div>
               </div>
            </div> 
            {
                    friendV === id ? <div> </div> : 
                    friend === true ? 
                        <button className="border border-black rounded-full shadow-xl p-2" onClick={handleRemoveFriend}><UserMinusIcon className="h-6 w-6 "/></button> :
                        <button className="border border-black rounded-full shadow-xl p-2" onClick={handleAddFriend}><UserPlusIcon className="h-6 w-6 "/></button>
            }  
            
        </div>
    )
}