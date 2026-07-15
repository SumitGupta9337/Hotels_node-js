import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register () {

  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [role , setRole] = useState("customer");

  const navigate = useNavigate();

  const handleRegister = async ()=> {
    try {
      const response = await api.post("api/auth/register",{
        name, 
        email,
        password,
        role
      });

      console.log(response.data);
      alert("Registeration Sucessful");
      navigate("/")



    } catch (err) {
      console.log(err);

      if(err.response){
        alert(err.response.data.error)
      
      }else{
        alert("Something Went Wrong");
      }
    }

  }


  return(
    <div>
      <h1>Register</h1>

      <input
        type = "text"
        placeholder="Enter Name"
        value={name}
        onChange={(e)=> setName(e.target.value)}
      />

      <br/><br/>

      <input
        type = "email"
        placeholder="Enter Email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type = "password"
        placeholder="Enter Password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
      />

      <br/><br/>

      <select
        value = {role}
        onChange={(e) => setRole(e.target.value)}
        >

        <option value="customer" >Customer</option>
        <option value="manager" >Manager</option>
        <option value="chef" >Chef</option>
        <option value="waiter" >Waiter</option>

      </select>

      <br/><br/>

      <button onClick={handleRegister}>Register</button>

    </div>
  );



  

  
}

export default Register;