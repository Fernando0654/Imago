import React, { useContext, useEffect, useState } from 'react';
// Icons
import { AiTwotoneSound } from "react-icons/ai";
import { HiOutlineTranslate, HiMoon, HiSun } from "react-icons/hi";
// Translation
import { readTextOutLoud } from '../actions/translation';
import { useSelector } from 'react-redux';
import { FormattedMessage } from "react-intl";
import { languageContext } from '../context/lang.context';
import toast from "react-hot-toast";
import ParticlesComponent from './particles.component';

const ConfigComponent = () => {
    const [ThemeLight, setThemeLight] = useState(false);
    const [LangEs, setLang] = useState(true);

    const language = useContext(languageContext)

    const voiceText = useSelector((state) => state.translated);

    useEffect(() => {
        changeStaticLanguage();
    }, [LangEs]);

    const handleTheme = () => {
        const message = LangEs ? "Color de tema cambiado" : "Color theme changed";
        toast.success(message);
        readTextOutLoud(message, LangEs ? "es-MX" : "en-US");
        if (!ThemeLight) {
            document.querySelector("body").className = "light";
        } else {
            document.querySelector("body").className = "dark";
        }
    }

    const handleLang = () => {
        const message = !LangEs ? "Cambiado al idioma español" : "Change to english language";
        toast.success(message);
        readTextOutLoud(message, !LangEs ? "es-MX" : "en-US");
    }

    const changeStaticLanguage = () => {
        if (LangEs) {
            language.setLanguage("es-MX");
        } else {
            language.setLanguage("en-US");
        }
    }

    return <div className="config_area">
        <ParticlesComponent isOriginalTheme={ThemeLight} />
        <div className="config">
            <div className="switcher_box">
                <div
                    className="icon-box"
                    style={!ThemeLight ? { transform: "rotate(0deg)" } : { transform: "rotate(170deg)" }} >
                    
                    {!ThemeLight ? <HiMoon className="icon" /> : <HiSun className="icon" />}

                </div>
                <div className="switcher" onClick={() => (setThemeLight(!ThemeLight), handleTheme())}>
                    <div className="circle" aria-hidden="true" style={!ThemeLight ? { left: "12%"} : {left: "50%"}}></div>
                </div>
            </div>
            <div className="change-lang_box" onClick={() => (setLang(!LangEs), handleLang())}>
                <div className="lang">
                    <span className={LangEs ? "active" : null}>Es</span>
                    <span className={!LangEs ? "active" : null}>En</span>
                </div>
                <HiOutlineTranslate className="icon" />
            </div>
            <button className="voice-active" onClick={() => readTextOutLoud(voiceText, LangEs ? "es-MX" : "en-US")}>
                <AiTwotoneSound />
            </button>
        </div>
        <h2>
            <FormattedMessage id="main.title" defaultMessage="Clasificador de Imágenes" />
        </h2>
    </div>
}

export default ConfigComponent;
