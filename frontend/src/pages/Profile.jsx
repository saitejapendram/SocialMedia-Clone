import { AllPosts } from "../components/AllPosts"
import { Friends } from "../components/Friends"
import { PostUpload } from "../components/PostUpload"
import { ProfilePicture } from "../components/ProfilePicture"
import { UserPosts } from "../components/UserPosts"
import { UserProfile } from "../components/UserProfile"

export const Profile = () => {
    return (
        <div className="">
            <div className="grid grid-cols-3">
                <div className=" mt-16">
                       <div className="w-64 flex items-center ml-8"><ProfilePicture /></div>
                       <UserProfile />
                       
                       
                </div>
                <div className="mt-12 w-96">
                    <PostUpload />
                    <UserPosts />
                </div>
                <div className="flex-1 mt-16 ml-8 mr-12">
                       <Friends />
                </div>
            </div>
        </div>
    )
}