import toast from "react-hot-toast";
import * as api from "../api";

export const translateToEn = (texto) => async (dispatch) => {
    try {
        const { data } = await api.translateToEnglish(texto);
        const splitText = data.split(".");
        dispatch({ type: "TRANSLATE", payload: splitText });
        readTextOutLoud(data, "en-US");
    } catch (error) {
        toast.error("Error when translation: " + error.message);
    }
}

export const translateToEs = (texto) => async (dispatch) => {
    try {
        const { data } = await api.translateToSpanish(texto);
        const splitText = data.split(".");
        if (splitText.lenght >= 3) splitText.splice(-1, 1);
        dispatch({ type: "TRANSLATE_ES", payload: splitText });
        readTextOutLoud(data, "es-MX");
    } catch (error) {
        toast.error("Error al traducir: " + error.message);
    }
}

export const readTextOutLoud = (voiceText, lang) => {
    const apiVoice = window.speechSynthesis;
    apiVoice.cancel();
    console.log(lang)
    const utterance = new SpeechSynthesisUtterance(voiceText);
    utterance.lang = lang;
    apiVoice.speak(utterance);
}
