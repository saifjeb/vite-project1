import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
function Formpage({messages,setMessages}){
    const navigate= useNavigate();
    const [FormData,setFormData] = useState({
        name:"",
        email:"",
        message:"",
    });
    const handleSubmit = (e)=> {
        e.preventDefault();
        try{
            console.log("Form data submited: ",FormData);
            setMessages([...messages,FormData]);
            navigate("/preview");
        }   catch(err){
            console.log(err);
        }
    };
    return(
        <>
        <h1>form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
            <input
             type="text"
             value={FormData.name}
             onChange={(e)=> setFormData({...FormData,name:e.target.value})}
             />
             <br/>
             <label htmlFor="">Email</label>
              <input
             type="email"
             value={FormData.email}
             onChange={(e)=> setFormData({...FormData,email:e.target.value})}
             />
             <br/>
             <label htmlFor="">Message</label>
             <input
             type="text"
             value={FormData.message}
             onChange={(e)=> setFormData({...FormData,message:e.target.value})}
             />
             <br/>
             <button type="submit">Submit</button>
        </form>
        </>
    );
}
export default Formpage;