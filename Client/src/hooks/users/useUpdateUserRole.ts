import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

async function updateUserRole(id: string, role: string) {
    return await apiClient.patch(`users/${id}/role`, { role });
}

export function useUpdateUserRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, role}: {id: string, role: string}) => updateUserRole(id, role),
        onSuccess: (_data, { id }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            queryClient.invalidateQueries(['userDetails', id]);
        }
    })
}