import { useEffect, useState } from "react";
import api from "../api/axios";

function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/api/user");
            setUsers(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsersById = async (id) => {
        try {
            const response = await api.get(`/api/user/${id}`);
            setSelectedUser(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const UpdateUser = async (id , updatedData) => {
        try {
            const response = await api.put(`/api/user/${id}`,updatedData);
            setSelectedUser(response.data);
            alert("Updated data successfully")
            fetchUsers();
            setSelectedUser(null);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteUser =async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (!confirmDelete) return;
        try {
            const response = await api.delete(`/api/user/${id}`)
            alert("User deleted Successfully")
            fetchUsers();
            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>

            {users.map((user) => (
                <div key={user._id}>
                    
                    <label><b>{user.name} : </b></label>

                    <button onClick={() => {fetchUsersById(user._id);
                                            setIsEditing(false);}}>
                        View User
                    </button>
                    &emsp;

                    <button onClick={() => {fetchUsersById(user._id);
                                            setIsEditing(true);}}>
                        Edit
                    </button>
                    &emsp;

                    <button onClick={() => { deleteUser(user._id);
                    }}>
                        Delete
                    </button>
                </div>
            ))}

            {selectedUser &&  (
                <div>
                    <br/>
                    <h2>Selected User</h2>
                    <p><b>Name :</b> {selectedUser.name}</p>
                    <p><b>Email :</b> {selectedUser.email}</p>
                </div>
            )}

            {
                selectedUser && isEditing && (
                    <div>
                        <br/>
                        <h2>Edit user</h2>
                        
                        <label>Name: </label>
                        <input
                            type="text"
                            value={selectedUser.name}
                            onChange={(e)=>{
                                setSelectedUser({
                                    ...selectedUser,
                                    name: e.target.value
                                })
                            }}
                        />

                        <br></br>
                        <label>Email: </label>
                        <input
                            type="email"
                            value={selectedUser.email}
                            onChange={(e)=>{
                                setSelectedUser({
                                    ...selectedUser,
                                    email: e.target.value
                                })
                            }}
                        />
                        <br></br>

                        {/* <input
                            type="text"
                            value={selectedUser.password}
                            onChange={(e)=>{
                                setSelectedUser({
                                    ...selectedUser,
                                    password: e.target.value
                                })
                            }}
                        /> */}

                        <button onClick={()=>{
                            UpdateUser(selectedUser._id,selectedUser)
                        }}> Save</button>

                        &emsp;
                        <button onClick={()=>{
                            setIsEditing(false);
                        }}> Cancel</button>
                    </div>
                )
            }
        </div>
    );
}

export default Users;