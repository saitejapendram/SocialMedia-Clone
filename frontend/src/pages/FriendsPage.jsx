import {Friends} from "../components/Friends";

export const FriendsPage = () => {
    return (
       <div className="flex justify-around items-center">
          <div className="flex justify-center mt-12 w-1/2">
               <Friends />
           </div>
        </div> 
    )
}