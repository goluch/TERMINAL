import {
    createColumnHelper,
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {RecipesQueryResponse} from "@hooks/useRecipeQuery.ts";
import {ProjectDto, RecipeDto, SampleDto} from "@api/terminalSchemas.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";

export interface RecipesProps {
    dataQuery: RecipesQueryResponse | undefined;
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
    pagination: PaginationState;
    setPagination: OnChangeFn<PaginationState>
    onChangeRecipeDetails: (id: string) => void;
}

const columnHelper = createColumnHelper<ProjectDto | SampleDto | RecipeDto>();

const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
];

const Recipes = (props: RecipesProps) => {

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
        props.onChangeRecipeDetails?.(id?.toString() ?? "");
    };

    return (
        <div className="h-[40rem] flex flex-col">
            <div className="flex-1 overflow-auto">
                <TableView table={table} handleClickRow={handleClick} />
            </div>
            <TableManagement table={table} />
        </div>
    );
};

export default Recipes;