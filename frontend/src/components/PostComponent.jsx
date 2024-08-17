import { HeartIcon } from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftEllipsisIcon,UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/solid';

import { useEffect, useState } from "react";
import { userIdF }from "../storage/atom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { Comments } from "./Comments";
export const PostComponent = ({ uniKey, id, profilePicture, username, location, image_url, description, likes, userId}) => {

    const [slikes, setSlikes] = useState(0);
    const [friend, setFriend] = useState(false);
    const friendV = useRecoilValue(userIdF);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    

    const handleLike = async () => {
          
          const response = await axios.put(`http://127.0.0.1:3001/api/v2/post/addLike?postId=${id}`,{},
            {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem('token')
                }
            }
          );
          
          setSlikes(response.data.likes);

    }

    useEffect(() => {
        const fetchFriends = async () => {
              const res = await axios.get(`http://127.0.0.1:3001/api/v2/user/profile?id=${userId}`,
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

    },[userId]);

    useEffect(() => {
        const fetchComments = async () => {
            const res = await axios.get(`http://127.0.0.1:3001/api/v2/post/getComments?postId=${id}`,
                {
                    headers : {
                        'Authorization' : "Bearer " + localStorage.getItem('token')
                    }
                }
              );

              setComments(res.data);
        }
        fetchComments();
    })

    
        const handleAddFriend = async () => {
            const res = await axios.get(`http://127.0.0.1:3001/api/v2/user/friend?friendId=${userId}`,
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
            const res = await axios.put(`http://127.0.0.1:3001/api/v2/user/removeFriend?friendId=${userId}`,{},
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

        const handleAddComment = async () => {
            const res = await axios.put(`http://127.0.0.1:3001/api/v2/post/addComment?postId=${id}`,{
                content : comment
            },
                {
                    headers : {
                        'Authorization' : "Bearer " + localStorage.getItem('token')
                    }
                }
            ); 
            if (!res.data) {
                return alert("Error while adding comment!")

            }
            setComment('');
            
            
        }

        

    


    return (
        <div key={uniKey} className="bg-slate-200 ml-4 pr-4 my-4 border shadow-xl rounded">
            <div className="flex justify-between items-center">
                <div className="flex items-center">

                
                <div>
                     <img src={`http://localhost:3001/uploads/${profilePicture}`} alt="" className="rounded-full h-16 w-16 border border-black shadow-lg ml-6 mt-4"/>
                </div>
                <div className="ml-2 pl-4 pt-2 text-xl font-bold text-black">
                     <div>{username && username.toUpperCase()}</div>
                     <div className="font-semibold text-lg">{location}</div>
                </div>
                </div>
                {
                    friendV === userId ? <div></div> :
                    friend === true ? 
                        <button className="border border-black rounded-full shadow-xl p-2 hover:bg-slate-400" onClick={handleRemoveFriend}><UserMinusIcon className="h-6 w-6 "/></button> :
                        <button className="border border-black rounded-full shadow-xl p-2 hover:bg-slate-400" onClick={handleAddFriend}><UserPlusIcon className="h-6 w-6 "/></button>
                }  
            </div>
            <div className="ml-4 flex justify-center  mt-6 rounded overflow-hidden border-black"><img src={`http://localhost:3001/uploads/${image_url}`} className="h-64 border border-black rounded shadow-xl  my-2 w-80" /> </div>
            <div className="text-lg font-semibold text-black py-2 ml-6 mr-4 border-b border-black">
                {description}
            </div>
            <div className="flex mt-2">
                <div>
                    <button onClick={handleLike}><HeartIcon className="h-6 w-6 ml-6 mb-0 rounded-full border-black"/></button>
                    <div className="text-lg font-semibold text-slate-800 ml-8 mt-0 pt-0 ">{likes}</div>
                </div> 
                <div className="flex mt-0 items-start gap-4">
                    <button onClick={handleAddComment}><ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 ml-4 mb-0 rounded-full border-black"/></button>
                    <div><input type="text" placeholder="Add comments here...." className="pl-2 w-full border border-black rounded shadow-xl" value={comment} onChange={(e) => setComment(e.target.value)}/></div>
                    <button className="px-2 border border-black rounded shadow-xl " onClick={handleAddComment}>post</button>
                </div>
            </div>
            <div className="ml-16 font-bold text-lg text-black ">Comments</div>
            {
                 comments && comments.map((comment) => (
                    <Comments label={comment.content} commentId={comment._id}/>
                 ))
            }
        </div>
    )
}