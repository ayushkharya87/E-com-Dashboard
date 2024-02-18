import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem("user");
      if (auth) {
        navigate("/")
      }
    }, []);

    const handleLogin = async () => {
        let result = await fetch("http://localhost:8080/login", {
          method: "post",
          body: JSON.stringify({email, password}),
          headers: {
            "Content-Type": "application/json"
          }
        });
        result = await result.json();
        if(result.auth) {
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("token", JSON.stringify(result.auth));
          navigate("/")
        } else {
          alert("Please enter correct details")
        }
    };


  return (
    <div>
        <h1>Login</h1>

        <div>
            <input type="text" onChange={(e) => setEmail(e.target.value)}  value={email} placeholder='Enter Your email'/>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Your password'/>
            <button onClick={handleLogin} type='button'>Login</button>
        </div>
    </div>
  )
}

export default Login