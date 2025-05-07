import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

interface ChangeUserPasswordDto {
    id: string;
    newPassword: string;
}

async function changeUserPassword({id, newPassword} : ChangeUserPasswordDto) {
    return await apiClient.patch(`users/${id}/password`, { newPassword });
}

export function useChangeUserPassword() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangeUserPasswordDto) => changeUserPassword(data),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['userDetails', id] });
            },
    });
}