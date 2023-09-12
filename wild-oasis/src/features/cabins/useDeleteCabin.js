import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

function useDeleteCabin() {
    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate:deleteCabin} = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success('Cabin successfully deleted');
            queryClient.invalidateQueries({ // 캐시데이터 invalidate함으로써 데이터 refetch하도록.
                queryKey: ['cabins']
            });
        },
        onError: err => toast.error(err.message),
    });

    return {isDeleting, deleteCabin};
}

export default useDeleteCabin;