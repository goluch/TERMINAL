import { SampleDto } from "@api/terminalSchemas";
import { UseQueryResult } from "react-query";
import { OnChangeFn } from "@tanstack/react-table";
import SamplesTable from "./SamplesTable";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import SamplesTableManage from "./SamplesTableManage";

export interface SamplesProps {
  onChangeSampleDetails?: (code: string) => void;
  dataQuery: UseQueryResult;
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
}

export interface SamplesQueryResponse {
  rows: SampleDto[];
  rowCount: number;
  pageCount: number;
}

const Samples = (props: SamplesProps) => {
  const columnHelper = createColumnHelper<SampleDto>();
  const columns = [
    columnHelper.accessor("code", {
      header: "Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("projectName", {
      header: "Project Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => info.getValue()?.toLocaleDateString(),
    }),
  ];

  const table = useReactTable({
    columns: columns,
    data: props.dataQuery?.data?.rows ?? [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: props.sorting,
      pagination: props.pagination,
    },
    rowCount: props.dataQuery.data?.rowCount,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleClick = (code: string | null | undefined) => {
    props.onChangeSampleDetails?.(code?.toString() ?? "");
  };

  if (props.dataQuery.isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  return (
    <div className="flex flex-col justify-center">
      <SamplesTable table={table} handleClickSample={handleClick} />
      <SamplesTableManage table={table} />
    </div>
  );
};

export default Samples;
