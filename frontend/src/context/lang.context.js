import React, { useState } from "react";
import esLang from "../lang/es-MX.json";
import enLang from "../lang/en-US.json";
import { IntlProvider } from "react-intl";

const languageContext = React.createContext();

const LanguageProvider = ({ children }) => {
    let localeSaved = "es-MX";
    let languageSaved = esLang;
    const isLanguageSaved = localStorage.getItem("lang");

    if (isLanguageSaved) {
        localeSaved = isLanguageSaved;
        if (isLanguageSaved === "es-MX") {
            languageSaved = esLang;
        } else if (isLanguageSaved === "en-US") {
            languageSaved = enLang;
        }
    }

    const [language, setlanguage] = useState(languageSaved);
    const [locale, setLocale] = useState(localeSaved);

    const setLanguage = (language) => {
        switch (language) {
            case "es-MX":
                setlanguage(esLang);
                setLocale("es-MX");
                localStorage.setItem("lang", "es-MX");
                break;
            case "en-US":
                setlanguage(enLang);
                setLocale("en-US");
                localStorage.setItem("lang", "en-US");
                break;
            default:
                setlanguage(esLang);
                setLocale("en-US");
                localStorage.setItem("lang", "es-MX");
                break;
        }
    };

    const getLanguage = () => isLanguageSaved;

    return (
        <languageContext.Provider value={{ setLanguage: setLanguage, getLanguage: getLanguage }}>
            <IntlProvider locale={locale} messages={language}>
                {children}
            </IntlProvider>
        </languageContext.Provider>
    )

}

export  { LanguageProvider, languageContext }
