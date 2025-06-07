import Projects from "@components/Projects/Projects.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useProjects } from "@hooks/projects/useGetProjects.ts";
import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader";
import Loader from "@components/Shared/Loader";

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
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ProjectsPage;
