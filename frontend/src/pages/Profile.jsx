import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setUser } from "../redux/slices/authSlice"; // Import Redux action
import { Box, Button, TextField, Avatar, Typography } from "@mui/material";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    
    const [username, setUsername] = useState(user?.username || "");
    const [profilePic, setProfilePic] = useState(user?.profilePic || "");
    const [editing, setEditing] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result); // Convert image to Base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const updatedUser = { ...user, username, profilePic };
        dispatch(setUser(updatedUser)); // Update Redux store
        setEditing(false);
    };

    return (
        <Box sx={{ textAlign: "center", maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Profile</Typography>
            
            {user ? (
                <>
                    <Avatar src={profilePic || "/default-avatar.png"} sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />
                    
                    {editing ? (
                        <>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            <TextField 
                                fullWidth 
                                margin="normal"
                                label="Username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6">{user.username}</Typography>
                            <Typography variant="body1">{user.email}</Typography>
                            <Typography variant="body2">Admin: {user.isAdmin ? "Yes" : "No"}</Typography>
                            <Button variant="outlined" onClick={() => setEditing(true)} sx={{ mt: 2 }}>Edit Profile</Button>
                        </>
                    )}
                </>
            ) : (
                <Typography>Please log in.</Typography>
            )}
        </Box>
    );
};

export default Profile;


// import { useSelector } from "react-redux";

// const Profile = () => {
//     const { user } = useSelector((state) => state.auth);

//     return (
//         <div>
//             <h2>Profile</h2>
//             {user ? (
//                 <>
//                     <p>Username: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                     <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
//                 </>
//             ) : (
//                 <p>Please log in.</p>
//             )}
//         </div>
//     );
// };

// export default Profile;
