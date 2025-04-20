import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

async function updateUserEmail(id: string, email: string) {
    return await apiClient.patch(`users/${id}/email`, { email });
}

export function useUpdateUserEmail() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, email}: {id: string, email: string}) => updateUserEmail(id, email),
        onSuccess: (_data, { id }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            queryClient.invalidateQueries(['userDetails', id]);
        }
    })
}