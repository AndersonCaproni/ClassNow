import { useContext } from "react";
import { AlertContext } from "../context/Alert/AlertContext";

export function useAlert(){
    const alert = useContext(AlertContext);

    return alert;
}