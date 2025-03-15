import toast, { ToastPosition } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading';

interface ToastOptions {
    duration?: number;
    position?: ToastPosition;
}

export const toastNotify = (
    message: string,
    type: ToastType = 'success',
    options?: Partial<ToastOptions>
) => {
    const defaultOptions = {
        duration: type === 'error' ? 5000 : 3000,
        position: 'top-right' as ToastPosition,
        ...options,
    };

    switch(type) {
        case "success":
            return toast.success(message, defaultOptions);
        case "error":
            return toast.error(message, defaultOptions);
        case "loading":
            return toast.loading(message, defaultOptions);
        default:
            return toast(message, defaultOptions);
    }
};

export const toastPromise = (promise: Promise<unknown>, messages: {
    success: string;
    error: string;
    loading: string;
}) => {
    return toast.promise(promise, messages, {
        position: 'top-right' as ToastPosition,
    });
};

export default toast;