import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";


function Theme() {
    const [theme,setTheme]= useState(()=>{
        return localStorage.getItem("theme") || "light";
    });


  useEffect(() => {
    document.body.style.backgroundColor=
      theme === "light" ? "#ffffff" :"#121221";
    document.body.style.color = theme === "light" ? "#000000" :"#ffffff";

    localStorage.setItem("theme",theme);
  }, [theme]);

  const handleSwitchTheme = ()=> {
    setTheme((current)=> (current === "light" ? "dark" : "light"));
    };

    return(
        <>
        <button onClick={handleSwitchTheme}> Switch Mode: {theme} </button>
        </>
    )
}
export default Theme;