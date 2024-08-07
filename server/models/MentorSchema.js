import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
      },
})

export default mongoose.model("Mentor",mentorSchema);