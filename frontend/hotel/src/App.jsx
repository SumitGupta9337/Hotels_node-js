import { useEffect , useState } from 'react'
import axios from 'axios'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Menu from './pages/Menu';
import Profile from './pages/Profile'
import Users from "./pages/Users";
import Tables from './pages/Tables';



function App() {
  // const [menu, setMenu] = useState([])

//  useEffect(() => {
//     axios.get("/api/menu")
//       .then((response) => {
//         console.log("Response:", response.data);
//         console.log("Is array:", Array.isArray(response.data));
//         setMenu(response.data);
//       })
//       .catch((err) => console.error(err));
//   }, []);
  return (

    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Login/>} />
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/dashboard" element = {<Dashboard/>} />
        <Route path= "/menu" element= {<Menu/>}/>
        <Route path= '/profile' element={<Profile/>}/>
        <Route path= '/users' element={<Users/>}/>
        <Route path= '/table' element={<Tables/>}/>
      </Routes>
    </BrowserRouter>
    // <>
      
    //  <h1 >HOTEL MANAGEMENT SYSTEM</h1>
    //  <p>MENU: {menu.length}</p>

     
    // {menu.map((item) => (
    //   <div key={item._id}>
    //     <h3>{item.name}</h3>
    //     <p>{item.category}</p>
    //     <p>{item.price}</p>
    //     <p>{item.description}</p>
    //   </div>
    // ))}

    // </>
  )
}

export default App
