import mongoose from "mongoose";

const schema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a title'],
    },
    email: {
        type: String,
        required: [true, 'Please add a content'],
    },
    message: {
        type: String,
        required: [true, 'Please add a content'],
    },
}, {
    timeStamps: true
}
)

export default mongoose.model("message", schema)