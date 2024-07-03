import { useSetRecoilState } from "recoil";
import { userProfileAtom } from "../storage/atom";

export const UserProfile = () => {
    const [userProfile, setUserProfile] = useSetRecoilState(userProfileAtom);

    return (
        <div>
             
        </div>
    )
}