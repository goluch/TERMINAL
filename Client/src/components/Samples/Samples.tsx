import { SampleDto } from "@api/terminalSchemas";
import { OnChangeFn } from "@tanstack/react-table";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { SamplesResponse } from "@hooks/samples/useGetSamples.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard";
import SamplesRowActions from "./SamplesRowActions";
import { useMemo } from "react";
import Chip from "@components/Shared/Chip";

export interface SamplesProps {
  onChangeSampleDetails?: (code: string) => void;
  samples: SamplesResponse | undefined;
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
  onEdit: (sampleId: string) => void;
  onDelete: (sampleId: string) => void;
}

const columnHelper = createColumnHelper<SampleDto>();

/**
 * Samples Component
 *
 * A component that displays a list of samples in a table format.
 * It allows for sorting and pagination of the sample data.
 * It also provides a way to handle row clicks to view sample details.
 *
 * @component
 * @param {SamplesProps} props - The properties for the Samples component.
 */
const Samples = (props: SamplesProps) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: "Code",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("project", {
        header: "Project Name",
        cell: (info) => <Chip value={info.getValue()} />,
      }),
      columnHelper.accessor("createdAtUtc", {
        header: "Created At",
        cell: (info) => new Date(info.getValue()).toDateString(),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 0,
        cell: ({ row }) => (
          <SamplesRowActions
            onEdit={() => props.onEdit(row.original.id)}
            onDelete={() => props.onDelete(row.original.id)}
          />
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    columns: columns,
    data: props.samples?.rows ?? [],
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: "auto" as unknown as number,
    },
    state: {
      sorting: props.sorting,
      pagination: props.pagination,
    },
    rowCount: props.samples?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleClickRow = (id: string | null) => {
    if (!props.onChangeSampleDetails || !id) return;

    props?.onChangeSampleDetails(id);
  };

  return (
    <TableCard className="!h-full">
      <TableView<SampleDto> table={table} handleClickRow={handleClickRow} />
      <TableManagement<SampleDto> table={table} />
    </TableCard>
  );
};

export default Samples;
