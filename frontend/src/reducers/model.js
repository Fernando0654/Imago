export default (model = {}, action) => {
    switch (action.type) {
        case "SET_MODEL":
            return action.payload;    
        default:
            return model;
    }
}
