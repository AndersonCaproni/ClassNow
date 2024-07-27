import { MdCheck, MdError, MdWarning, MdClose } from 'react-icons/md';
import styles from './_alert.module.scss';
import { useEffect } from 'react';

const Alert = ({ isOpen, setIsOpen, type, children }) => {
    const ALERT_TYPES = {
        warning: {
            icon: <MdWarning />,
            titulo: "Atenção!",
            styles: styles.warning,
        },
        danger: {
            icon: <MdError />,
            titulo: "Erro!",
            styles: styles.danger,
        },
        success: {
            icon: <MdCheck />,
            titulo: "Sucesso!",
            styles: styles.success,
        },
        completed: {
            icon: <MdCheck />,
            titulo: "Completo!",
            styles: styles.completed,
        },
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsOpen();
            }, 10000);
        }

    }, [isOpen, setIsOpen]);



    if (isOpen) {
        return (
            <div className={styles.alert__wrapper}>
                <div className={`${styles.alert} ${ALERT_TYPES[type].styles}`}>
                    {ALERT_TYPES[type].icon}
                </div>

                <div className={`${styles.alert} ${ALERT_TYPES[type].styles}`}>
                    <div className={`${styles.alert__title}`}>
                        <span>{ALERT_TYPES[type].titulo}</span>
                    </div>

                    <div className={styles.alert__content}>
                        <span>{children}</span>
                    </div>

                    <MdClose onClick={() => setIsOpen()}/>
                </div>
            </div>
        )
    }
}

export default Alert;