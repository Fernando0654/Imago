import axios from "axios";

const urlPhoto = "http://localhost:5000/photos";

const urlTrans = "http://localhost:5000/translation";

const urlTransEs = "http://localhost:5000/translation/es";

export const fetchPhotos = () => axios.get(urlPhoto);

export const createPhoto = (newPhoto) => axios.post(urlPhoto, newPhoto);

export const deletePhoto = (idPhoto) => axios.delete(urlPhoto + "/" + idPhoto);

export const translateToEnglish = (text) => axios.post(urlTrans, text);

export const translateToSpanish = (text) => axios.post(urlTransEs, text);
