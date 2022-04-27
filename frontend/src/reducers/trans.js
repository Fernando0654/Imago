export default (translated = [], action) => {
    switch (action.type) {
        case "TRANSLATE":
            return action.payload;  
        case "TRANSLATE_ES":
            return action.payload; // Pure functional use, you can pass  
        default:
            return translated;
    }
}
