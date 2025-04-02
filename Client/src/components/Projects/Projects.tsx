import {
    createColumnHelper,
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {ProjectDto} from "@api/terminalSchemas.ts";
import {ProjectsQueryResponse} from "@hooks/useProjectQuery.ts";
import {useState} from "react";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";

export interface ProjectsProps {
    dataQuery: ProjectsQueryResponse | undefined;
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
    pagination: PaginationState;
    setPagination: OnChangeFn<PaginationState>
    onChangeProjectDetails: (id: string) => void;
}

const Projects = (props: ProjectsProps) => {
    const columnHelper = createColumnHelper<ProjectDto>();
    const [columns] = useState(()=>
        [
            columnHelper.accessor("name", {
                header: "Name",
                cell: (info) => info.getValue(),
            }),
        ]);

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
        props.onChangeProjectDetails?.(id?.toString() ?? "");
    };

    return (
        <div className="h-[40rem] flex flex-col">
            <div className="flex-1 overflow-auto">
                <TableView<ProjectDto> table={table} handleClickRow={handleClick} />
            </div>
            <TableManagement<ProjectDto> table={table} />
        </div>
    );
};

export default Projects;