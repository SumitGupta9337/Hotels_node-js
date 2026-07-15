    import { useState , useEffect } from "react";
    import api from "../api/axios"

    function Tables () {

        const [tables , setTables] = useState([]);
        const [selectedTable , setSelectedTables]= useState(null); 
        const [tableDetails , setTableDetails] = useState(null);
        const [isEditing , setIsEditing] = useState(false);
        const [tableNumber, setTableNumber] =  useState(null);
        const [capacity, setCapacity] = useState(null);
        const [status, setStatus] = useState("available");
        const [showAddForm, setShowAddForm] = useState(false);  

        const fetchTables = async () => {
            try {
                const getTable = await api.get("/api/table");
                setTables(getTable.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchTableDetails = async (id) => {
            try{
                const response = await api.get(`/api/table/${id}/details`)
                setSelectedTables(response.data);

            }catch(err){
                console.error(err);
            }
        }

        const addNewTable = async () =>{
            try {
                const response = await api.post('/api/table',{
                    tableNumber,
                    capacity,
                    status
                });

                fetchTables();
                setTableNumber(null);
                setCapacity(null);
                setStatus("available");
                setShowAddForm(false);

            } catch (err) {
                console.error(err);
            }
        }

        const editTableDetails = async (id ,data) => {
            try {
                const response = await api.put(`/api/table/${id}`,data)
                setSelectedTables(response.data)
                setIsEditing(false);
                fetchTables();
                fetchTableDetails(id);
                
            } catch (err) {
                console.error(err);
                
            }
        }

        useEffect(() => {
            fetchTables();
        }, []);

        return (
            <div>
                <h1>Table Page</h1>
                <button onClick={() => setShowAddForm(true)}>
                    Add New Table
                </button>

                <hr/>
                {
                    tables.map((table) => (
                        <div key ={table._id}>

                            <p><b>Table no :</b> {table.tableNumber} </p>
                            <p><b>Capacity :</b> {table.capacity} </p>
                            <p><b>Status : </b>{table.status} </p>

                            <button onClick={() => {fetchTableDetails(table._id);
                                                    setIsEditing (false);
                            }}>
                                Table Details
                            </button> &emsp;

                            <button onClick = {() => {fetchTableDetails(table._id); 
                                                      setIsEditing  (true); }}>
                                Edit table
                            </button>

                            &emsp;

                            <hr/>
                        </div>
                    ))
                }


                {selectedTable && !isEditing &&(
                    <div>
                        <h2>Table Details</h2>

                        {/* <p><b>Table Number:</b> {selectedTable.table.tableNumber}</p>
                        <p><b>Capacity:</b> {selectedTable.table.capacity}</p>
                        <p><b>Status:</b> {selectedTable.table.status}</p> */}

                        <hr />

                        {selectedTable.currentOrder ? (
                            <div>
                                <p><b>Order Id:</b> {selectedTable.currentOrder._id}</p>
                                <p><b>Customer:</b> {selectedTable.currentOrder.customer.name}</p>
                                <p><b>Email:</b> {selectedTable.currentOrder.customer.email}</p>
                                <p><b>Waiter:</b> {selectedTable.currentOrder.waiter.name}</p>

                                <p><b>Items:</b></p>
                                {selectedTable.currentOrder.items.map((item) => (
                                    <div key={item._id}>
                                        <p>{item.menuItem.name} - Qty: {item.quantity}</p>
                                    </div>
                                ))}

                                <p><b>Total:</b> ₹{selectedTable.currentOrder.totalAmount}</p>
                                <p><b>Status:</b> {selectedTable.currentOrder.status}</p>
                            </div>
                        ) : (
                            <p>No active order for this table.</p>
                        )}
                    </div>
                )}

                {
                    selectedTable && isEditing && (
                        <div>
                            <h3>Edit table Details </h3>
                            <label>Table No: </label>
                            <input
                                type = "number"
                                value = {selectedTable.table.tableNumber}
                                onChange={(e) =>
                                    setSelectedTables({
                                        ...selectedTable,
                                        table: {
                                            ...selectedTable.table,
                                            tableNumber: Number(e.target.value),
                                        },
                                    })
                                }
                            />

                            <br/><br/>

                            <label>Capacity: </label>
                            <input
                                type = "number"
                                value = {selectedTable.table.capacity}
                                onChange={(e) =>
                                    setSelectedTables({
                                        ...selectedTable,
                                        table: {
                                            ...selectedTable.table,
                                            capacity: Number(e.target.value),
                                        },
                                    })
                                }
                            />

                            <br/><br/>

                            <label>Status:  </label>
                            <input
                                type = "text"
                                value = {selectedTable.table.status}
                                onChange={(e) =>
                                    setSelectedTables({
                                        ...selectedTable,
                                        table: {
                                            ...selectedTable.table,
                                            status: e.target.value,
                                        },
                                    })
                                }
                            />
                            <br/> <br/>

                        <button onClick={()=>{
                            editTableDetails(selectedTable.table._id,selectedTable.table)
                        }}> Save</button>

                        &emsp;
                        <button onClick={()=>{
                            setIsEditing(false);
                        }}> Cancel</button>
                    
                        </div>
                    )
                }

                {showAddForm && (
                    <div>
                        <h2>Add New Table</h2>

                        <label>Table Number: </label>
                        <input
                            type="number"
                            value={tableNumber ?? ""}
                            onChange={(e) => setTableNumber(Number(e.target.value))}
                        />

                        <br /><br />

                        <label>Capacity: </label>
                        <input
                            type="number"
                            value={capacity ?? ""}
                            onChange={(e) => setCapacity(Number(e.target.value))}
                        />

                        <br /><br />

                        <label>Status: </label>
                        <input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />

                        <br /><br />

                        <button onClick={addNewTable}>
                            Add Table
                        </button>

                        &nbsp;

                        <button
                            onClick={() => {
                                setShowAddForm(false);
                                setTableNumber(null);
                                setCapacity(null);
                                setStatus("available");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
)}

            </div>
        );

    }
    export default Tables;