import { useEffect, useState } from "react";
import axios from "axios";
import { PostComponent } from "./PostComponent";
import post2 from "../assets/post2.jpeg";

export const UserPosts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const profilefunc = async () => {

              const response = await axios.get("http://127.0.0.1:3001/api/v2/post/posts", {headers : {Authorization : "Bearer "+localStorage.getItem("token")}})
              
              setPosts(response.data)


        }

        profilefunc();

    }, [])

    return (
        <div className="mt-12 ">
            
            {posts.map((post, index) => (
                <PostComponent uniKey={index} id={post._id} username={post.username} profilePicture={post.profilePicture} location={post.location} image_url={post.picturePath} description={post.description} likes={post.likes.length} userId={post.userId}/>
            ))}
        </div>
    )
}