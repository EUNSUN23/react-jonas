import {useQuery} from "@tanstack/react-query";
import {getCabins} from "../../services/apiCabins.js";

/**
 * cabin 목록 조회
 * @returns {{isLoading: boolean, error: unknown, cabins: unknown}}
 */
function useCabins() {
    const {
        isLoading,
        data: cabins,
        error
    } = useQuery({
        queryKey: ['cabins'], // data 식별자
        queryFn: getCabins // query 함수. 항상 promise를 반환해야한다.
    });

    return {isLoading, cabins, error};
}

export default useCabins;