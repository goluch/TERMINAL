import Projects from "@components/Projects/Projects.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import {useAllProjects} from "@hooks/projects/useGetAllProjects.ts";
import {toastPromise} from "../utils/toast.utils.tsx";
import {useDeleteProject} from "@hooks/projects/useDeleteProject.ts";

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
    <div className="h-full flex gap-3 flex-wrap sm:flex-nowrap justify-center p-3">
      <div className="sm:w-10/12 xl:w-8-12 h-full">
        {dataQueryProjects.isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <Projects
            dataQuery={dataQueryProjects.data}
            sorting={sorting}
            setSorting={setSorting}
            pagination={pagination}
            setPagination={setPagination}
            onChangeProjectDetails={() => {}}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
