  import { useNavigate } from "react-router-dom";
  import { useEffect } from "react";

  

  function Dashboard() {
    const navigate = useNavigate();

    useEffect (() =>{
      const token = localStorage.getItem("token");

      if(!token)
      {
        navigate("/");
      }
    },[navigate]);

    const logout = () =>{
      localStorage.removeItem("token");
      navigate("/")
    };

    return (
      <div>
        <h1>Restaurant Management System</h1>
        <hr/>

        <button onClick={() => navigate("/menu")}>
          Menu Management
        </button>

        <br/><br/>
        <button onClick={() => navigate("/table")}>
          Table Management
        </button>

        <br/><br/>
        <button onClick={() => navigate("/order")}>
          Order Management
        </button>

        <br/><br/>
        <button onClick={() => navigate("/profile")}>
          Profile Management
        </button>

        <br/><br/>
        <button onClick={() => navigate("/users")}>
          User Management
        </button>
        <br/><br/>
        
        <button onClick={logout}>
            Logout
        </button>


      </div>

    );
  }

  export default Dashboard;