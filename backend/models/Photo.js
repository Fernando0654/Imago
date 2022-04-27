import mongoose from "mongoose"

const photoSchema = mongoose.Schema({
    title: String,
    precision: String,
    selectedFile: String,
    createdAt: { type: Date, default: new Date()}
});

const PhotoSchema = mongoose.model("PhotoModel", photoSchema)

export default PhotoSchema;
