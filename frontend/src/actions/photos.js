import toast from "react-hot-toast";
import * as api from "../api";
import { timing } from "../lib/measurement"; // Still does not exist

const lang = localStorage.getItem("lang");

export const getPhotos = () => async (dispatch) => {
    try {
        let t1 = performance.now();
        const { data } = await api.fetchPhotos();
        let t2 = performance.now();
        timing(t1, t2, lang === "es-MX" ? "Fotografías extraídas en: " : "Images extracted in: ");
        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
        toast.error("Error when fetching: " + error.message); // Just for dev, don't show error message
    }
}

export const createPhoto = (photo) => (dispatch) => {
    try {
        const action = { type: "CREATE", payload: photo };
        dispatch(action);
    } catch (error) {
        toast.error("Error when creating: " + error.message);
    }
}

export const deletePhoto = (data) => async (dispatch) => {
    try {
        const action = {type: "FETCH_ALL", payload: data};
        dispatch(action);
        const message = lang === "es-MX" ? "Imagen eliminada" : "Image deleted";
        toast.success(message);
    } catch (error) {
        toast.error("Error when deleting: " + error.message);
    }
}
