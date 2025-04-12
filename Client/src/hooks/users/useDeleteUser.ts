import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { UsersRequest, UsersResponse } from "@hooks/users/useGetUsers.ts";

async function deleteUser(id: string) {
    return await apiClient.delete(`users/${id}`);
}

export function useDeleteUser(params: UsersRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: (_data, id) => {
            queryClient.setQueryData(['users', params], (users: UsersResponse | undefined) => {
                if (!users) return users;
                return {
                    ...users,
                    rows: users.rows.filter((user) => user.id !== id),
                };
            });
        },
    });
}