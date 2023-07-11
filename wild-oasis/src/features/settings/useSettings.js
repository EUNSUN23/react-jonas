import {getSettings} from "../../services/apiSettings.js";
import {useQuery} from "@tanstack/react-query";

function useSettings() {
    const {isLoading, error, data:settings} = useQuery({
        queryKey:['settings'],
        queryFn: getSettings
    });

    return {isLoading, error, settings};
}

export default useSettings;