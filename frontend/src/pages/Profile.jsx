import React, { useState } from "react";
import { Container, Box, Typography, Avatar, TextField, Button, IconButton } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";

const Profile = ({ user }) => {
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "https://via.placeholder.com/150");
    const [username, setUsername] = useState(user?.username || "Guest");
    const [isEditing, setIsEditing] = useState(false);

    // Handle profile picture update
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result); // Convert image to base64 URL
            };
            reader.readAsDataURL(file);
        }
    };

    // Toggle name edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 20,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                {/* Profile Picture Upload */}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="profile-pic-upload"
                    onChange={handleProfilePictureChange}
                />
                <label htmlFor="profile-pic-upload">
                    <IconButton component="span">
                        <Avatar
                            src={profilePicture}
                            alt="Profile Picture"
                            sx={{ width: 120, height: 120, mb: 2 }}
                        />
                    </IconButton>
                </label>

                {/* Editable Name Field */}
                {isEditing ? (
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2, textAlign: "center" }}
                    />
                ) : (
                    <Typography variant="h4">{username}</Typography>
                )}

                {/* Edit/Save Button */}
                <IconButton onClick={toggleEdit} color="primary" sx={{ mt: 1 }}>
                    {isEditing ? <Save /> : <Edit />}
                </IconButton>

              
            </Box>
        </Container>
    );
};

export default Profile;
