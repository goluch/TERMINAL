import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SamplesRequest, SamplesResponse} from "@hooks/samples/useGetSamples.ts";
import apiClient from "@api/apiClient.ts";
import {AxiosResponse} from "axios";

async function deleteSample(id: string | undefined): Promise<AxiosResponse> {
    return await apiClient.delete(`samples/${id}`);
}

export function useDeleteSample(params: SamplesRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteSample(id),
        onSuccess: (_data, variables) => {
            queryClient.setQueryData(['sampleDetails', variables], (() => null))
            queryClient.setQueryData(['samples', params], ((samples: SamplesResponse): SamplesResponse =>
                    (
                        {
                            ...samples,
                            rows: samples.rows.filter((row) => row.id !== variables)
                        }
                    )
            ))
        }
    });
}