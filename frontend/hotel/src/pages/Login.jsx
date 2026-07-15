import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () =>{
      try {
        
        const response  = await  api.post("/api/auth/login",{
          email,
          password
        });

        localStorage.setItem("token", response.data.token);
          

        alert("Login Successful");
        navigate("/dashboard");

      } catch (error) {
        alert("Invalid Email or Password ")
        console.log(error);
        
      }
    }

    

    return(
      <div>
        <h1>Login Page</h1>
        <input 
            type ="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <br/><br/>

        <input
            type ="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <br/><br/>

        <button onClick={handleLogin}>
          Login
        </button>
      </div>      
    );
}

export default Login;