import { useState } from "react";

export const useAlert = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('');

    const showAlert = (alertMessage: string) => {
        setMessage(alertMessage);
        setOpenAlert(true);
        setTimeout(() => {
            setOpenAlert(false);
        }, 3000);
    }
    return { openAlert, showAlert, message };
}