import {SampleDto} from "@api/terminalSchemas";
import {OnChangeFn} from "@tanstack/react-table";
import {
    getCoreRowModel,
    useReactTable,
    createColumnHelper,
    SortingState,
    PaginationState,
} from "@tanstack/react-table";
import {SamplesResponse} from "@hooks/samples/useGetSamples.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard";

export interface SamplesProps {
    onChangeSampleDetails?: (code: string) => void;
    dataQuery: SamplesResponse | undefined;
    sorting: SortingState;
    pagination: PaginationState;
    setSorting: OnChangeFn<SortingState>;
    setPagination: OnChangeFn<PaginationState>;
}

const columnHelper = createColumnHelper<SampleDto>();
const columns = [
    columnHelper.accessor("code", {
        header: "Code",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("project", {
        header: "Project Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAtUtc", {
        header: "Created At",
        cell: (info) => {
            const date: Date = new Date(info.getValue());
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        },
    }),
    columnHelper.accessor("comment", {
        header: "Comment",
        cell: (info) => info.getValue(),
    }),
];

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
    const table = useReactTable({
        columns: columns,
        data: props.dataQuery?.rows ?? [],
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting: props.sorting,
            pagination: props.pagination,
        },
        rowCount: props.dataQuery?.rowsAmount ?? 0,
        onSortingChange: props.setSorting,
        onPaginationChange: props.setPagination,
        manualSorting: true,
        manualPagination: true,
    });

    const handleClick = (id: string | null | undefined) => {
        props.onChangeSampleDetails?.(id?.toString() ?? "");
    };

    return (
        <TableCard>
            <TableView<SampleDto> table={table} handleClickRow={handleClick}/>
            <TableManagement<SampleDto> table={table}/>
        </TableCard>
    );
};

export default Samples;