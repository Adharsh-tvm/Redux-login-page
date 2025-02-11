import { useEffect, useState } from "react";
import axios from "axios";
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, Button, TextField, IconButton 
} from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import authService from "../services/authService";
import { useDispatch } from "react-redux";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
            let data = localStorage.getItem('user')
    
            if (!data  ) {
                navigate('/login')
            } 
        })        

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api", data, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true, // Important for sending cookies
                });
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingId(user._id);
        setEditedUser({ ...user });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/api/users/${editingId}`, editedUser, { withCredentials: true });
            setUsers(users.map((user) => (user._id === editingId ? editedUser : user)));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${id}`, { withCredentials: true });
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleLogout = async () => {
        await authService.logoutUser();
        dispatch({ type: "auth/logout" }); // ✅ Dispatch a plain object to Redux

        console.log("Logged Out");
        
        navigate("/login"); // Redirect to login page

      };

    return (
        <>
        <Header onLogout={handleLogout} />
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Dashboard</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Username</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>
                                    {editingId === user._id ? (
                                        <TextField 
                                        value={editedUser.username || ""} 
                                        onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} 
                                        size="small"
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === user._id ? (
                                        <TextField 
                                        value={editedUser.email || ""} 
                                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} 
                                        size="small"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === user._id ? (
                                        <IconButton color="primary" onClick={handleSave}>
                                            <Save />
                                        </IconButton>
                                    ) : (
                                        <IconButton color="secondary" onClick={() => handleEdit(user)}>
                                            <Edit />
                                        </IconButton>
                                    )}
                                    <IconButton color="error" onClick={() => handleDelete(user._id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </>
    );
};

export default Admin;
