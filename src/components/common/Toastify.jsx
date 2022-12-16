import { toast } from 'react-toastify';

const Toastify = (message, type) => {
    switch (type) {
        case 'success':
            return toast.success(message);
        case 'error':
            return toast.error(message);
        case 'warning':
            return toast.warning(message);
        case 'info':
            return toast.info(message);
        default:
            return toast.success(message);
    }
};

export default Toastify;
