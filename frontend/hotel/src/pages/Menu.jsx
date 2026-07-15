import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Menu() {
    const [name , setName] = useState("");
    const [category , setCategory] = useState("");
    const [price , setPrice] = useState("");
    const [available , setAvailable] = useState("");
    const [description , setDescription] = useState("");

    const [menuItems, setMenuItems] = useState([]);

    // Fetch all menu items
    const fetchMenu = async () => {
        try {
            const response = await api.get("/api/menu");
            setMenuItems(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Load menu when page opens
    useEffect(() => {
        fetchMenu();
    }, []);

    // Add new menu item
    const handleNewItem = async () => {
        try {
            
            await api.post("/api/menu" ,{
                name,
                category,
                price,
                available,
                description
            });

            alert("Item Added Successfully");
            setName("");
            setCategory("");
            setPrice("");
            setAvailable(true);
            setDescription("");
            
            fetchMenu();

        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong");
            console.log(err); 
        }
    }

  


    return (
        <div><h1> Restaurant Menu</h1>
        <hr/>
        <p>Total items: {menuItems.length}</p>
        {
            menuItems.map((item) => (
                <div key={item._id}>
                    <h3>Item name : {item.name}</h3>
                    <p>Category: {item.category}</p>
                    <p>{item.price}</p>
                    <p>Available: {item.available ? "Yes" : "No"}</p>
                    <p>{item.description}</p>
                    <hr/>
                </div>
            ))
        }
        <h2>Add new Item</h2>
        <input
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
        />
        <br/><br/>

        <input
            list="categories"
            placeholder="Enter category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
        />

        <datalist id="categories">
            <option value="veg" />
            <option value="non-veg" />
        </datalist>

        <br/><br/>

        <input
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
        />
        <br/><br/>


        <input
            list="availability"
            placeholder="availability"
            value={available}
            onChange={(e)=>setAvailable (e.target.value)}
        />
        <datalist id ="availability">
            <option>true</option>
            <option>false</option>
        </datalist>
        <br/><br/>

        <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
        />
        <br/><br/>  

        <button onClick={handleNewItem}>Add new item</button>
        </div>
    );
    

}

export default Menu;    