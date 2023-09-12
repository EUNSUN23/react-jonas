import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

function useEditCabin() {
    const queryClient = useQueryClient();

    const {mutate: editCabin, isLoading: isEditing} = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id), // mutationFn은 인자 하나만 받을 수 있어서..
        onSuccess: () => {
            toast.success('New cabin successfully edited');
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },
        onError: err => toast.error(err.message)
    });

    return {editCabin, isEditing};
}

export default useEditCabin;