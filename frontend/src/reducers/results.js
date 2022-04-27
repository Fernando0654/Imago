export default (result = [], action) => {
    switch (action.type) {
        case "GET_RESULT":
            return action.payload; 
        default:
            return result;
    }
}
