import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Profile(){

    const[profile , setProfile] = useState(null);

    const fetchProfile = async () =>{
        try {
            const response = await api.get("/api/auth/profile");
            setProfile(response.data)
        } catch (error) {
            console.log(error);   
        }
    }

    useEffect(()=>{
        fetchProfile();
    },[]);


    return(
        <div>
            <h1>Profile Page</h1>
            
                {profile && (
                    <div>
                        <h3>USER PROFILE</h3>
                        <p>User Name: {profile.name}</p>
                        <p>Email: {profile.email}</p>
                        <p>Role: {profile.role}</p>
                    </div>
                )}
             
    
        </div>
    );
}
export default Profile;