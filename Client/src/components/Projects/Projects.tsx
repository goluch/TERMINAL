import {
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ProjectDto } from "@api/terminalSchemas.ts";
import { ProjectsResponse } from "@hooks/projects/useGetProjects.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard";
import ProjectsRowActions from "./ProjectsRowActions";
import { Color } from "utils/colorUtils";
import Chip from "@components/Shared/Chip";
import {useMemo} from "react";

export interface ProjectsProps {
  dataQuery: ProjectsResponse | undefined;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  onChangeProjectDetails: (id: string) => void;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

function getChipColors(isActive: boolean): Color {
  return isActive ? "green" : "red";
}

function getChipValue(isActive: boolean): string {
  return isActive ? "Active" : "Not Active";
}

const columnHelper = createColumnHelper<ProjectDto>();

/**
 * Projects Component
 *
 * A component that displays a list of projects in a table format.
 * It allows sorting and pagination of the project data.
 * It also provides a way to change the project details view when a project is clicked.
 *
 * @component
 */
const Projects = (props: ProjectsProps) => {
  const columns = useMemo(()=>[
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isActive", {
      header: "Active",
      cell: (info) => (
          <Chip
              value={getChipValue(info.getValue())}
              getColorValue={() => getChipColors(info.getValue())}
          />
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      size: 0,
      cell: ({ row }) => (
          <ProjectsRowActions
              onEdit={() => {props.onEdit(row.original.id)}}
              onDeactivate={() => {}}
              onDelete={()=> props.onDelete(row.original.id)} />
      ),
    }),
  ],
  [])

  const table = useReactTable({
    columns: columns,
    data: props.dataQuery?.rows ?? [],
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: "auto" as unknown as number,
    },
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
    <TableCard className="!h-full">
      <TableView<ProjectDto> table={table} handleClickRow={handleClick} />
      <TableManagement<ProjectDto> table={table} />
    </TableCard>
  );
};

export default Projects;
