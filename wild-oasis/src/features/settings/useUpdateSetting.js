import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.js";
import toast from "react-hot-toast";

function useUpdateSetting() {
    const queryClient = useQueryClient();
    const {isLoading:isUpdating, mutate:updateSetting} = useMutation({
        mutationFn:updateSettingApi,
        onSuccess:()=>{
            toast.success("Setting successfully edited");
            queryClient.invalidateQueries({
                queryKey:['settings']
            })
        },
        onError:(err)=> toast.error(err.message)
    });

    return {updateSetting,isUpdating};


}

export default useUpdateSetting;