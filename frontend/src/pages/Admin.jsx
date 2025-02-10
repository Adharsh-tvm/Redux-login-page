import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get("http://localhost:8000/api", { withCredentials: true });
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
