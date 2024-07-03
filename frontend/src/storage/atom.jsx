import { atom, selector, } from "recoil"
import axios from "axios";

const userPostsAtom = atom({
    key: "userPostsAtom",
    default : selector({
        key: "userPostsSelector",
        get : async () => {
            const res = await axios.get(`http://localhost:3001/api/v2/post/posts`);
            return res.data.posts;
        }
    })
})

const userProfile = atom({
    key: "userprofile",
    default : selector({
        key: "userProfileSelector",
        get: async() => {
            const res = await axios.get(`http://localhost:3001/api/v2/user/profile`);
            return res.data.user;
        }
    })
})

const userFriends = atom({
    key: "userFriends",
    default : selector({
        key:"userFriendsSelector",
        get : async () => {
            const res = await axios.get(`http://localhost:3001/api/v2/user/friends`);
            return res.data.friends;
        }
    })
})

const allPosts = atom({
    key: "allPosts",
    default : selector({
        key : "allPostsSelector",
        get : async () => {
             const res = await axios.get(`http://localhost:3001/api/v2/post/allPosts`);
             return res.data.posts; 
        }
    })
})
