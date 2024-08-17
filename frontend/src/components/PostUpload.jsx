import { useState } from "react"
import axios from "axios";

export const PostUpload = () => {
    const [selectedFile, setSelectedFile] = useState('');
    const [description, setDescription] = useState('');

    
        const handleUpload = async () => {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('description', description);
            
    
            try {
                const response = await axios.post('http://127.0.0.1:3001/api/v2/post/addPost', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : "Bearer "+localStorage.getItem("token")
                  },
                });
                
                
              } catch (error) {
                console.error('Error uploading image:', error);
              }
    
        }

    

    

    
    return (
        <div className="bg-slate-200 mt-14 ml-4 border rounded shadow-xl p-2 ">
           <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
           <input type="text" placeholder="Description....." className="w-full pl-2 py-1 border border-black rounded my-2" value={description} onChange={(e) => setDescription(e.target.value)}/>
           <button onClick={handleUpload} className="font-bold text-xl text-black mt-2 border border-black rounded shadow-xl px-2 py-1">Upload Post</button>
    </div>
    )
}