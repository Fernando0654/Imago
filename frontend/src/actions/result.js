export const saveResult = (resultado) => (dispatch) => {
    dispatch({type: "GET_RESULT", payload: resultado});
}
