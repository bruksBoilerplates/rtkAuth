import {Status} from "../../utils";

export const setButtonColor = (loadingStatus, setButtons) => {
    switch (loadingStatus) {
        case Status.NORMAL:
            setButtons({color: "primary", text: "Login"});
            return
        case Status.ERROR:
            setButtons({color: "danger", text: "error"});
            setTimeout(() => {
                setButtons({color: "primary", text: "Login"});
            }, 3000);
            return
        case Status.LOADING:
            setButtons({color: "primary", text: "Loading..."});
            return
        case Status.SUCCESS:
            setButtons({color: "success", text: "Login"});
            return
        default:
            setButtons({color: "primary", text: "Login"});
    }
}