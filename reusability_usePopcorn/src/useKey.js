import {useEffect} from "react";

export function useKey(key, action) {

    useEffect(function () {
        function callback(event) {
            if (event.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        }
        document.addEventListener('keydown', callback); // MovieDetails인스턴스가 mount될때마다 이벤트리스너가 누적되어서 등록된다.--> cleanup 필요

        return function () {
            document.removeEventListener('keydown', callback);
        };

    }, [action]);

}