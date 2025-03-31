import {
    createColumnHelper,
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {ProjectDto, SampleDto} from "@api/terminalSchemas.ts";
import {ProjectsQueryResponse} from "@hooks/useProjectQuery.ts";
import {useEffect} from "react";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";

export interface ProjectsProps {
    dataQuery: ProjectsQueryResponse | undefined;
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
    pagination: PaginationState;
    setPagination: OnChangeFn<PaginationState>
}

const Projects = (props: ProjectsProps) => {
    const columnHelper = createColumnHelper<ProjectDto | SampleDto>();

    const columns = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: (info) => info.getValue(),
        }),
    ];
    useEffect(()=>{
        console.log(props.dataQuery)
    },[props.dataQuery])

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
        // props.onChangeSampleDetails?.(id?.toString() ?? "");
        console.log("Test", id)
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

export default Projects;