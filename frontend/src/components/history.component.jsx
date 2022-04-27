import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Translation
import { FormattedMessage } from 'react-intl';
// Icons
import { AiFillDelete } from "react-icons/ai";
// Pusher
import * as api from "../api";
import { timing } from '../lib/measurement';

const HistoryComponent = () => {
    const photos = useSelector((state) => state.photos);
    const _lang = localStorage.getItem("lang");
    const deleteImg = async (id) => {
        let t1 = performance.now();
        await api.deletePhoto(id);
        let t2 = performance.now();
        timing(t1, t2, _lang === "es-MX" ? "Foto eliminada en: " : "Image deleted in: ");
    }

    return <div className="history_area">
        <h4>
            <FormattedMessage id="main.history" defaultMessage="Historial" />
        </h4>
        <div className="container_history">
            {
                photos.length === 0 ?
                    <div className="no-result">
                        <span>
                            <FormattedMessage id="main.noHistory" defaultMessage="No se encontró historial" />
                        </span>
                    </div>
                    : photos.map((photo, index) => (
                        <div className="box_img" key={index}>
                            <span className="title">{photo.title}</span>
                            <img src={photo.selectedFile} alt={photo.title} />
                            <span className="subtitle">
                                <FormattedMessage id="main.reliability" defaultMessage="Seguridad de predicción" />
                                : {photo.precision}%
                            </span>
                            <button className="delete-img" onClick={() => deleteImg(photo._id)}>
                                <AiFillDelete />
                            </button>
                        </div>
                    ))
            }
        </div>
    </div>
}

export default HistoryComponent;
