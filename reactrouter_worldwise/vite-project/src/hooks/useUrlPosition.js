import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export function useUrlPosition() {
    const [searchParams] = useSearchParams();

    const lat = Number(searchParams.get('lat'));
    const lng = Number(searchParams.get('lng'));

    return [lat, lng]
}