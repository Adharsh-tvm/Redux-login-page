import React from "react";
import { Container, Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = ({ user }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile"); // Navigate to the Profile page
    };

    return (
        <>
            <Header />
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: 30,
                        p: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        bgcolor: "background.paper",
                        cursor: "pointer", // Makes it clear that it's clickable
                        "&:hover": { boxShadow: 6 }, // Slight hover effect
                    }}
                    onClick={handleProfileClick}
                >
                    <Avatar
                        src={user?.profilePicture || "https://via.placeholder.com/150"}
                        alt="Profile Picture"
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5">
                        {user?.username || "Guest"}
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Home;
