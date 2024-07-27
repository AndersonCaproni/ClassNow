import Alert from "../../Componentes/Alert/Alert.js";
import { useReducer } from "react";
import { reducer } from "../../Uteis/reducer";
import { initialAlertState } from "../../Uteis/initialStates";
import { AlertContext } from "./AlertContext";

export const AlertProvider = ({children}) => {
    const [alertState, dispatchAlertState] = useReducer(
        reducer,
        initialAlertState
    );

    function handleAlert(text, type) {
        dispatchAlertState({
            type: "update_multiples",
            object: {
                isOpen: !alertState.isOpen,
                text: text ? text : "",
                type: type ? type : "success",
            },
        });
    }

    return (
        <AlertContext.Provider value={{ alertState, handleAlert }}>
            <Alert
                isOpen={alertState.isOpen}
                setIsOpen={handleAlert}
                type={alertState.type}
            >
                {alertState.text}
            </Alert>
            {children}
        </AlertContext.Provider>
    );

}


