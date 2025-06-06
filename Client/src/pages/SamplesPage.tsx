import { useState } from "react";
import { SortingState, PaginationState } from "@tanstack/react-table";
import Samples from "@components/Samples/Samples.tsx";
import SampleDetails from "@components/Samples/SampleDetails.tsx";
import { useSamples } from "@hooks/samples/useGetSamples.ts";
import { useSampleDetails } from "@hooks/samples/useGetSampleDetails.ts";
import { useDeleteSample } from "@hooks/samples/useDeleteSample.ts";
import { toastPromise } from "utils/toast.utils";

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

  const deleteMutation = useDeleteSample({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    orderBy: sorting[0]?.id ?? "",
    desc: sorting[0]?.desc ?? true,
  });

  const [sampleDetailsId, setSampleDetailsId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dataQuerySampleDetails = useSampleDetails(sampleDetailsId);

  const changeSampleDetails = (id: string) => {
    setDetailsOpen(true);
    setSampleDetailsId(id);
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    try {
      await toastPromise(deleteMutation.mutateAsync(id), {
        loading: "Deleting sample...",
        success: "Deletion successful",
        error: "Deletion failed",
      });
    } catch {
      // Error is handled by toastPromise
    }
  };

  return (
    <div className="h-full flex gap-3 flex-wrap sm:flex-nowrap justify-center p-3">
      <div className="sm:w-10/12 xl:w-8-12 h-full flex flex-col">
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
            onDelete={handleDelete}
            onEdit={changeSampleDetails}
          />
        )}
        {dataQuerySampleDetails.isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <SampleDetails
            sample={dataQuerySampleDetails.data}
            open={detailsOpen}
            openChange={setDetailsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default SamplesPage;
