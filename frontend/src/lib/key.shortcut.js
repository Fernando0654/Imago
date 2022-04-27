import React from "react";
import { useRef, useLayoutEffect, useCallback, useEffect} from "react";

const UseKeypress = (keys, callback, node) => {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    const handleKeypressed = useCallback((evento) => {
        if(keys[0] === evento.key && evento.ctrKey === true) {
            document.querySelector("input").click();
        }
        if(keys[1] === evento.key && evento.ctrKey === true) {
            document.querySelector(".switcher").click();
        }
        if(keys[2] === evento.key && evento.ctrKey === true) {
            document.querySelector(".change-lang_box").click();
        }
        if(keys[3] === evento.key && evento.ctrKey === true && evento.altKey === true) {
            document.querySelector(".ident").click();
        }
    }, [keys]);

    useEffect(() => {
        const targetNode = node ?? document;
        targetNode 
        && targetNode.addEventListener("keydown", handleKeypressed);
        return () => targetNode && targetNode.removeEventListener("keydown", handleKeypressed);
    }, [handleKeypressed, node])
    
}

export default UseKeypress;
