import React, { useRef, useState } from 'react';
// Img
import imgEmpty from "../assets/icons/img-icon.svg";
import logoLight from "../assets/img/logo_light.png";
import logoDark from "../assets/img/logo_dark.png";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { saveResult } from '../actions/result';
// Toast
import toast from "react-hot-toast";
// Translation
import { FormattedMessage } from 'react-intl';
import * as api from "../api";
import { useContext } from 'react';
import { languageContext } from '../context/lang.context';
import axios from 'axios';
import { timing } from '../lib/measurement';

const ImgComponent = () => {
  const [ImgUrl, setImgUrl] = useState(null);
  const [ImgContainer, setImgContainer] = useState(null);

  const dispatch = useDispatch();
  const Model = useSelector((state) => state.model);
  const language = useContext(languageContext);

  let imgBefore = "";
  const lang = language.getLanguage();

  const imgRef = useRef();

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgContainer(file);
      setImgUrl(url);
    } else {
      setImgUrl(null);
    }
  }

  const clearInputField = () => setImgUrl(null);

  const saveImage = async (result) => {
    eraseCommas(result);
    const formData = new FormData();
    formData.append("file", ImgContainer);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
    axios.post(process.env.REACT_APP_CLOUDINARY_ENDPOINT, formData)
      .then(async (res) => {
        const url = res.data.url;
        const precision = result[0].probability * 100;
        let title = result[0].className.split(",")[0];
        if (lang === "es-MX") {
          const { data } = await api.translateToSpanish({ text: result[0].className.split(",")[0] });
          title = data;
        }
        const newPhoto = { title: title, precision: precision.toFixed(2), selectedFile: url };
        let t1 = performance.now();
        await api.createPhoto(newPhoto);
        let t2 = performance.now();
        timing(t1, t2, lang === "es-MX" ? "Foto agregada en: " : "Image added in: ");
        dispatch(saveResult(result));
      });

    clearInputField();
  }

  const identifyImg = async (e) => {
    e.preventDefault();
    if (!ImgUrl) {
      return;
    }
    if (!ImgUrl && imgBefore !== null) {
      toast.error(lang === "es-MX" ? "Imagen ya identificada" : "Image already identified");
      return;
    }
    imgBefore = ImgUrl;
    const results = getObjectsOnImg().then((result) => {
      saveImage(result);
    }).catch((err) => console.log(err));
    toast.promise(results, {
      loading: lang === "es-MX" ? "Identificando..." : "Identifying...",
      success: lang === "es-MX" ? "Imagen identificada" : "Image identified",
      error: lang === "es-MX" ? "Ha ocurrido un error" : "An error has occurred"
    });
  }

  const getObjectsOnImg = () => {
    return new Promise((resolve, reject) => {
      try {
        const results = Model.classify(imgRef.current);
        resolve(results);
      } catch (error) {
        reject(error);
      }
    })
  }

  const eraseCommas = (resultado) => {
    resultado.forEach((element) => {
      element.className = element.className.split(", ")[0];
    });
    dispatch(saveResult(resultado));
  }



  return <div className="img_area">
    <img src={logoLight} alt="" className="logo light" />
    <img src={logoDark} alt="" className="logo dark" />
    <form className="input_img" onSubmit={(e) => identifyImg(e)}>
      <label htmlFor="input-img"
        className={ImgUrl ? "img_preview withFile" : "img_preview notFile"}
        style={ImgUrl ? { backgroundImage: `url(${ImgUrl})` } : { backgroundImage: `url(${imgEmpty})` }}>
        <input type="file" onChange={uploadImage} />
        <img src={ImgUrl} alt="image hidden" aria-hidden="true" className="hidden" ref={imgRef} />
      </label>
      <div className="controls_wrapper">
        <button type="submit" className={ImgUrl != null ? "allowed ident" : "forbidden ident"}>
          <FormattedMessage id="main.identifyBtn" defaultMessage="Identificar Imagen" />
        </button>
      </div>
    </form>
  </div>
}

export default ImgComponent;
