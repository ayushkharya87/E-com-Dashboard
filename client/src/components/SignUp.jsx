import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem("user");
      if(auth) {
        navigate("/")
      }
    });

    const data = async () => {
        let result = await fetch("http://localhost:8080/signup", {
          method: "post",
          body: JSON.stringify({name, email, password}),
          headers: {
            "Content-Type": "application/json"
          }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result))
        navigate("/");
    }

  return (
    <div>
        <h1>Create a New account!</h1>

        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name'/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email'/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password'/>

            <button onClick={data} type='button'>Sign Up</button>
        </div>
    </div>
  )
}

export default SignUp