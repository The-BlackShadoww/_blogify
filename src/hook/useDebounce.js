import { useEffect, useRef } from "react";

export const useDebounce = (callback, delay) => {
    const timeOutIdRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeOutIdRef.current) {
                clearTimeout(timeOutIdRef.current);
            }
        };
    });

    const debounceCallback = (...arg) => {
        if (timeOutIdRef.current) {
            clearTimeout(timeOutIdRef.current);
        }

        timeOutIdRef.current = setTimeout(() => {
            callback(...arg);
        }, delay);
    };

    return debounceCallback;
};
