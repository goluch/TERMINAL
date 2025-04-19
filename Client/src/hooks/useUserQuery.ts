import {UserDetailsDto} from "@api/terminalSchemas.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

export type UsersRequest = {
    pageNumber: number;
    pageSize: number;
    desc?: boolean;
}

export type UsersQueryResponse = {
    rows: UserDetailsDto[];
    pageAmount: number;
    rowsAmount: number;
}

async function fetchDataUsers(params:UsersRequest): Promise<UsersQueryResponse> {
    const users = await apiClient.get('/users', {params});
    const amountOfUsers = await apiClient.get('/users/amount');
    return{
        rows: users.data.users,
        pageAmount: Math.ceil(amountOfUsers.data / params.pageSize),
        rowsAmount: amountOfUsers.data,
    }
}

export function useUsers(params: UsersRequest) {
    return useQuery(
        {
            queryKey: ['users', params],
            queryFn: () => fetchDataUsers(params),
            placeholderData: keepPreviousData
        }
    )
}

