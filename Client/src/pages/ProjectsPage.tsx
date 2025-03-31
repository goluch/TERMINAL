import Projects from "@components/Projects/Projects.tsx";
import {useState} from "react";
import {PaginationState, SortingState} from "@tanstack/react-table";
import {useProjects} from "@hooks/useProjectQuery.ts";

const ProjectsPage = () => {
    const [sorting, setSorting] = useState<SortingState> ([]);
    const [pagination, setPagination] = useState<PaginationState>(
        {
            pageIndex: 0,
            pageSize:10
        }
    )

    const dataQueryProjects = useProjects({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        desc: sorting[0]?.desc ?? true
    })


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center p-5">
                <div className="flex-1 bg-white p-3 rounded-md m-1">
                    {dataQueryProjects.isLoading ?
                        (
                            <div className="flex justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        ):
                        (
                            <Projects
                                dataQuery={dataQueryProjects.data}
                                sorting={sorting}
                                setSorting={setSorting}
                                pagination={pagination}
                                setPagination={setPagination}
                            />
                        )
                    }
                </div>
                <div className="flex-1 bg-white p-3 rounded-md m-1 self-start">
                    PORJECT DETAILS
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;