import Projects from "@components/Projects/Projects.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useProjects } from "@hooks/projects/useGetProjects.ts";
import ProjectDetails from "@components/Projects/ProjectDetails.tsx";
import { useProjectDetails } from "@hooks/projects/useGetProjectDetails.ts";
import { useDeleteProject } from "@hooks/projects/useDeleteProject.ts";

const ProjectsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQueryProjects = useProjects({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const mutation = useDeleteProject({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const [projectDetailsId, setProjectDetailsId] = useState<string | null>(null);

  const dataQueryProjectDetails = useProjectDetails(projectDetailsId);

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
            onChangeProjectDetails={setProjectDetailsId}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
