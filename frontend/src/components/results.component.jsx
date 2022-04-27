import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { translateToEn, translateToEs } from "../actions/translation";
import { FormattedMessage } from "react-intl";
import { languageContext } from "../context/lang.context";

const ResultComponent = () => {
    const translatedText = useSelector((state) => state.translated);
    const result = useSelector((state) => state.results);
    const dispatch = useDispatch();

    const language = useContext(languageContext);
    const lang = language.getLanguage();

    const translateText = (voiceText) => {
        if (lang === "es-MX") {
            dispatch(translateToEs({ text: voiceText }));
        } else {
            dispatch(translateToEn({ text: voiceText }));
        }
    }

    const getStringVoice = () => {
        let predictionVoice = "";
        result.map((guess, index) => { // I recommend using your native lang as a first option here
            if (index === 0) {
                predictionVoice += "Me parece ue la imagen contiene una " + guess.className;
            }
            if (index === 1) {
                predictionVoice += ". Puede que contenga una " + guess.className;
            }
            if (index === 2) {
                predictionVoice += ". Lo que sé es que no tiene una " + guess.className;
            }
        });
        translateText(predictionVoice);
    }

    useEffect(() => {
        if (result.length > 0) {
            getStringVoice();
            console.log("Cambió a: " + lang)
        };
    }, [result, lang])


    return <div className="results_area">
        <h2>
            <FormattedMessage id="main.results" defaultMessage="Resultados" />
        </h2>
        {translatedText.length > 0 ?
            translatedText.map((text, index) => (
                <div className="box_result" key={index}>
                    <h3>{text}</h3>
                </div>
            )) :
            <div className="no-result">
                <span>
                    <FormattedMessage id="main.noResults" defaultMessage="Identifica tu primera imagen" />
                </span>
            </div>
        }
    </div>
}

export default ResultComponent