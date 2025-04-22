import {useState} from "react";
import {SortingState, PaginationState} from "@tanstack/react-table";
import {useSamples} from "@hooks/useSampleQuery.ts";

import Samples from "@components/Samples/Samples.tsx";
import SampleDetails from "@components/Samples/SampleDetails.tsx";
import {useSampleDetails} from "@hooks/useSampleDetailsQuery.ts";

const SamplesPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const dataQuerySamples = useSamples({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        orderBy: sorting[0]?.id ?? "",
        desc: sorting[0]?.desc ?? true,
    });

    const [sampleDetailsId, setSampleDetailsId] = useState<string | null>(null);

    const dataQuerySampleDetails = useSampleDetails(sampleDetailsId);

    const changeSampleDetails = (id: string) => {
        setSampleDetailsId(id);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-wrap justify-center p-1 gap-1">
                <div className="basis-3/5 rounded-lg bg-white">
                    {dataQuerySamples.isLoading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <Samples
                            dataQuery={dataQuerySamples.data}
                            sorting={sorting}
                            pagination={pagination}
                            setSorting={setSorting}
                            setPagination={setPagination}
                            onChangeSampleDetails={changeSampleDetails}
                        />
                    )}
                </div>
                <div className="basis-2/5 rounded-md self-start">
                    {dataQuerySampleDetails.isLoading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : sampleDetailsId ? (
                        <SampleDetails dataQuery={dataQuerySampleDetails.data}/>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default SamplesPage;
