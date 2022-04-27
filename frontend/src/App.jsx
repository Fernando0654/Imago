import React, { useState, useEffect } from "react"
import * as mobilenet from "@tensorflow-models/mobilenet"
// Estilos
import "./scss/index.scss"
// Components
import ImgComponent from "./components/img.component"
import ResultComponent from "./components/results.component"
import HistoryComponent from "./components/history.component"
import ConfigComponent from "./components/config.component"
import AdvisorComponent from "./components/advisor.component"
// Redux
import { useDispatch } from "react-redux"
import { createPhoto, getPhotos } from "./actions/photos"
import { setModel } from "./actions/model"
// Custom hook
import UseKeypress from "./lib/key.shortcut"
import { timing } from "./lib/measurement"
// Toast
import toast, { Toaster } from 'react-hot-toast'
// Listener
import Pusher from "pusher-js"

const App = () => {
    const [isModelLoading, setIsModelLoading] = useState(false);

    const dispatch = useDispatch();
    const _lang = localStorage.getItem("lang");

    const shortcuts = ["x", "z", "y", "s"];

    UseKeypress(shortcuts, UseKeypress);

    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            let t1 = performance.now();
            const model = await mobilenet.load({
                version: 2,
                alpha: 1.0
            });
            let t2 = performance.now();
            timing(t1, t2, _lang === "es-Mx" ? "Modelo establecido en: " : "Model set forth in: ");
            dispatch(setModel(model));
            setIsModelLoading(false);
        } catch (error) {
            console.log("Error: " + error.message); // Don't use error at least if you have an error
            setIsModelLoading(false);
        }
    }

    const getVoicesSystem = () => {
        let isSpanish = false;
        let isEnglish = false;
        const apiVoice = window.speechSynthesis;
        const voices = apiVoice.getVoices();
        voices.forEach((idiom) => {
            if (idiom.lang === "es-MX") {
                toast.success("Idioma español disponible");
                isSpanish = true;
            }
            if (idiom.lang === "en-US") {
                toast.success("Inglés disponible");
                isEnglish = true;
            }
        });
    }

    useEffect(() => {
        dispatch(getPhotos());
        loadModel();
    }, []);

    useEffect(() => {
        getVoicesSystem();
        document.querySelector("body").style.overflowY = "hidden";
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER,
            useTLS: true
        });
        const channel = pusher.subscribe('photos');
        channel.bind("deleted", () => dispatch(getPhotos()));
        channel.bind("inserted", (data) => dispatch(createPhoto(data)));
    }, []);

    return (
        <>
            <Toaster position="bottom-center" />
            {
                isModelLoading ?
                    <div className="loading">
                        <span>Cargando</span>
                        <div className="lds-ellipsis"><div></div><div></div><div></div></div>
                    </div> :
                    <>
                        <AdvisorComponent />
                        <ImgComponent />
                        <ConfigComponent />
                        <ResultComponent />
                        <HistoryComponent />
                    </>
            }
        </>
    );
};

export default App;
