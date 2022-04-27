import express from "express"
import { addPhotos, deletePhoto, getPhotos } from "../controllers/photo.js";

const RoutePhoto = express.Router();

RoutePhoto.get("/", getPhotos);
RoutePhoto.post("/", addPhotos);
RoutePhoto.delete("/:id", deletePhoto);

export default RoutePhoto;
