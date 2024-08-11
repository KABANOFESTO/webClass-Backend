import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject'],
    },
    message: {
        type: String,
        required: [true, 'Please add a message'],
    },
}, {
    timestamps: true  // Corrected to lowercase "timestamps"
});

export default mongoose.model("Message", schema);  // Capitalized the model name for convention
