import { TrashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
export const Comments = ({label, commentId}) => {

    const handleRemoveComment = async () => {
        
        const res = await axios.put(`http://127.0.0.1:3001/api/v2/post/removeComment?commentId=${commentId}`,{},
            {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem('token')
                }
            }
          );
    }
    return (
        <div className="ml-16 mt-0 mb-2 flex justify-between items-center border-b border-black pb-1">
            <div className=''>{label}</div>
            <button onClick={handleRemoveComment}><TrashIcon className="h-4 w-4  hover:bg-slate-400" /></button>
        </div>

    )
}