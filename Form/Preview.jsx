import React from "react";

function Preview({data}){
    console.log(data);
    return(
        <>
        <div>
            <h2>preview Messages</h2>
            {data.length ===0 ? (
                <p>NO messages to display</p>
            ):(
                <ul>
                    {data.map((message,index)=>(
                        <li key={index}>
                            {index+1}-<strong>Name:</strong> {message.name} <br/>
                            <strong>email:</strong> {message.email} <br/>
                            <strong>message:</strong> {message.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
}
export default Preview;
