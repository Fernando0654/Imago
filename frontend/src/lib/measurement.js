import toast from "react-hot-toast";

export const timing = (_init, _finish, _message) => {
    const total = (_finish - _init) / 1000;
    toast.success(_message + total.toFixed(2) + "s");
}
