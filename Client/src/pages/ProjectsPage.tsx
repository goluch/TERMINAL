import Projects from "@components/Projects/Projects.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import {useAllProjects} from "@hooks/projects/useGetAllProjects.ts";
import {toastPromise} from "../utils/toast.utils.tsx";
import {useDeleteProject} from "@hooks/projects/useDeleteProject.ts";
import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader";
import Loader from "@components/Shared/Loader";

const ProjectsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQueryProjects = useAllProjects({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const deleteMutation = useDeleteProject({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    try {
      await toastPromise(deleteMutation.mutateAsync(id), {
        loading: "Deleting project...",
        success: "Deletion successful",
        error: "Deletion failed",
      });
    } catch {
      // Error is handled by toastPromise
    }
  };

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={dataQueryProjects.isLoading}
        loader={<Loader />}
      >
        <Projects
          dataQuery={dataQueryProjects.data}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
          onChangeProjectDetails={() => {}}
          onDelete={handleDelete}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ProjectsPage;
