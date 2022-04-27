import express from "express"
import { getTranslation, getTranslationEs } from "../controllers/translation.js";

const RouteTranslation = express.Router();

RouteTranslation.post("/", getTranslation);
RouteTranslation.post("/es", getTranslationEs);

export default RouteTranslation;
