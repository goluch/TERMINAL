import {PaginationState, SortingState} from "@tanstack/react-table";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {SamplesQueryResponse} from "@api/terminalSchemas.ts";
import apiClient from "@api/apiClient.ts";


async function fetchData(options: { pageIndex: number; pageSize: number; sorting?: SortingState }) {
    return apiClient.get<>()
}

export function useSamples(pagination: PaginationState, sorting?: SortingState) {

    return useQuery<SamplesQueryResponse>({
        queryKey: ["samples", sorting, pagination],
        queryFn: () => fetchData({ ...pagination, sorting: sorting }),
        placeholderData: keepPreviousData,
    });
}