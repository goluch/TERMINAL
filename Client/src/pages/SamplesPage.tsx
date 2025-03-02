import { useState } from "react";
import { useSamples, useSampleDetails } from "../hooks/apiHooks";
import Samples from "../components/Samples/Samples";
import SampleDetails from "../components/Samples/SampleDetails";
import { SortingState, PaginationState } from "@tanstack/react-table";
import useUserData from "../hooks/useUserData";

const SamplesPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const { data } = useUserData();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [codeSampleDetails, setCodeSampleDetails] = useState<string>("AS1");

    const samplesQuery = useSamples(pagination, sorting);
    const sampleDetailsQuery = useSampleDetails(codeSampleDetails);

    const changeSampleDetails = (code: string) => {
        setCodeSampleDetails(code);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {data?.email}
            <div className="flex justify-center p-5">
                <div className="flex-1 bg-white p-3 rounded-md m-1">
                    <Samples
                        dataQuery={samplesQuery}
                        sorting={sorting}
                        pagination={pagination}
                        setSorting={setSorting}
                        setPagination={setPagination}
                        onChangeSampleDetails={changeSampleDetails}
                    />
                </div>
                <div className="flex-1 bg-white p-3 rounded-md m-1 self-start">
                    <SampleDetails dataQuery={sampleDetailsQuery} />
                </div>
            </div>
        </div>
    );
};

export default SamplesPage;
