import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { UsersRequest, UsersResponse } from "@hooks/users/useGetUsers.ts";

async function deleteUser(id: string) {
    return await apiClient.delete(`users/${id}`);
}

export function useDeleteUser(params: UsersRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: (_data, id) => {
            queryClient.setQueryData(['userDetails', id], () => null)
            queryClient.setQueryData(['users', params], ((users: UsersResponse): UsersResponse =>
                    (
                        {
                            ...users,
                            rows: users.rows.filter((row) => row.id !== id)
                        }
                    )
            ));
        }
    });
}