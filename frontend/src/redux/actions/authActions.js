import axios from "axios";
import { setUser } from "../slices/authSlice";

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post("http://localhost:8000/api/auth/login", { email, password }, { withCredentials: true });

        dispatch(setUser(data)); // Store user data (including profilePic URL) in Redux
    } catch (error) {
        console.error("Login Failed:", error);
    }
};
