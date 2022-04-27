import React, { useRef } from 'react'
import { AiOutlineCloseSquare, AiOutlineInfoCircle } from "react-icons/ai";

const AdvisorComponent = () => {
    const popUp = useRef(null);
    const wrapper = useRef(null);

    const closeWindowPop = () => {
        document.querySelector("body").style.overflowY = "scroll";
        popUp.current.style.display = "none";
        wrapper.current.style.display = "none";
    }

    return <>
        <div
            className="wrapper_layer"
            aria-label="hidden"
            onClick={() => closeWindowPop()}
            ref={wrapper}></div>
        <div className="pop_up" ref={popUp}>
            <button onClick={() => closeWindowPop()}>
                <AiOutlineCloseSquare className="icon" />
            </button>
            <h1>Welcome to Imago</h1>
            <p>
                This is a general image classifier, with the purpose of identifying dozens of images of all
                dozens of images of all types, classifying them by voice.
            </p>
            <div className="pop_info">
                <div className="info_icon">
                    <AiOutlineInfoCircle className="infoIc" />
                </div>
                <div className="info_text">
                    <ul>
                        <li>
                            Press <b>ctrl + x</b> to enter an Image or <b>drag and drop</b> the image inside the box
                        </li>
                        <li>
                            Press <b>ctrl + y</b> to change the language of the app
                        </li>
                        <li>
                            Press <b>ctrl + z</b> to change the app theme
                        </li>
                        <li>
                            Press <b>ctrl + shift + s</b> to read the output outloud
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </>
}

export default AdvisorComponent;
