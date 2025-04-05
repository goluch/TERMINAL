import {
    createColumnHelper,
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {UserDetailsDto} from "@api/terminalSchemas.ts";
import {UsersQueryResponse} from "@hooks/useUserQuery.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";

export interface UsersProps {
    dataQuery: UsersQueryResponse | undefined;
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
    pagination: PaginationState;
    setPagination: OnChangeFn<PaginationState>
    onChangeUserDetails: (id: string) => void;
}

const columnHelper = createColumnHelper<UserDetailsDto>();
const columns= [
    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
    })
]

const Users = (props: UsersProps) => {

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
        props.onChangeUserDetails?.(id?.toString() ?? "");
    };

    return (
        <div className="h-[40rem] flex flex-col">
            <div className="flex-1 overflow-auto">
                <TableView<UserDetailsDto> table={table} handleClickRow={handleClick} />
            </div>
            <TableManagement<UserDetailsDto> table={table} />
        </div>
    );
};

export default Users;