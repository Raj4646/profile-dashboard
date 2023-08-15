import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    name: {
        type: String,
    },
    ph_no: {
        type: String,
    },
    about: {
        type: String,
    },
    skills: {
        type: String,
    },
    certifications: {
        type: String,
    }
    
})

const User = mongoose.models.users || mongoose.model
("users", userSchema);

export default User;