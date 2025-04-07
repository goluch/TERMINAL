import { SampleDetailsDto } from "../api/terminalSchemas";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { SampleDto, SamplesQueryResponse } from "../api/terminalSchemas";

const samplesData: SampleDto[] = Array.from({ length: 100 }, (_, i) => ({
    id: `sample-${i + 1}`,
    code: `AS${i + 1}`,
    projectName: "TEST",
    createdAt: new Date(2021, 8, i + 1),
}));

export function useSamples(pagination: PaginationState, sorting?: SortingState) {
    async function fetchData(options: { pageIndex: number; pageSize: number; sorting?: SortingState }) {
        await new Promise((r) => setTimeout(r, 500));

        return {
            rows: samplesData.slice(options.pageIndex * options.pageSize, (options.pageIndex + 1) * options.pageSize),
            pageCount: Math.ceil(samplesData.length / options.pageSize),
            rowCount: samplesData.length,
        };
    }

    return useQuery<SamplesQueryResponse>({
        queryKey: ["samples", sorting, pagination],
        queryFn: () => fetchData({ ...pagination, sorting: sorting }),
        placeholderData: keepPreviousData,
    });
}

export function useSampleDetails(code: string) {
    async function fetchData(code: string) {
        const foundSample = samplesData.find((sample) => sample.code === code);
        return {
            ...foundSample,
            comment: "Default comment",
            steps: [],
            tags: [],
        };
    }

    return useQuery<SampleDetailsDto>({
        queryKey: ["sampleDetails", code],
        queryFn: () => fetchData(code),
        placeholderData: keepPreviousData,
    });
}
