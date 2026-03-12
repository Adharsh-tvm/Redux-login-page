import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'
import cloudinary from '../config/cloudinary.js';

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        createToken(res, newUser._id);

        return res.status(201).json({
            message: "User registered successfully",
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        return res.status(400).json({ message: "Invalid user data" });
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.status(400).json({ message: "User does not exist. Please sign up first." });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

    // If authentication is successful, create token and return user data
    createToken(res, existingUser._id);

    return res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        profilePic:existingUser.profilePic,
    });
});



const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie('jwt','', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully"});
})



const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password"); // Exclude passwords
    res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


const updateCurentUserProfile = asyncHandler(async (req, res) => {
    console.log(req)
    const user = await User.findById(req.body.userId)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const updateUserProfilePic = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_pics",
        });

        // Update the user profile in the database
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePic = result.secure_url; // Save the Cloudinary URL
        await user.save();

        res.json({ profilePic: result.secure_url });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});



const deleteUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if(user.isAdmin) {
            res.status(400)
            throw new Error("Cannot delete admin")
        }

        await User.deleteOne({_id:user._id});
        res.json({message : "User removed"})
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if(user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error("User not found")
    }
})


const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save()

        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


export { 
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile,
    updateCurentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,
    updateUserProfilePic 
 };