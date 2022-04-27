export const setModel = (modelo) => (dispatch) => {
    const action = { type: "SET_MODEL", payload: modelo};
    dispatch(action);
}
