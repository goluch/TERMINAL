import { useState } from "react";
import { SortingState, PaginationState } from "@tanstack/react-table";
import {useSamples} from "@hooks/useSampleQuery.ts";
import Samples from "@components/Samples/Samples.tsx";

const SamplesPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [codeSampleDetails, setCodeSampleDetails] = useState<string>("AS1");
    console.log(codeSampleDetails)

    const dataQuery= useSamples({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize
    });

    // const sampleDetailsQuery = useSampleDetails(codeSampleDetails);

    const changeSampleDetails = (code: string) => {
        setCodeSampleDetails(code);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center p-5">
                <div className="flex-1 bg-white p-3 rounded-md m-1">
                    <Samples
                        dataQuery={dataQuery}
                        sorting={sorting}
                        pagination={pagination}
                        setSorting={setSorting}
                        setPagination={setPagination}
                        onChangeSampleDetails={changeSampleDetails}
                    />
                </div>
                <div className="flex-1 bg-white p-3 rounded-md m-1 self-start">
                    {/*<SampleDetails dataQuery={sampleDetailsQuery} />*/}
                </div>
            </div>
        </div>
    );
};

export default SamplesPage;
