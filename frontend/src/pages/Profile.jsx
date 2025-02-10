import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div>
            <h2>Profile</h2>
            {user ? (
                <>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
                </>
            ) : (
                <p>Please log in.</p>
            )}
        </div>
    );
};

export default Profile;
