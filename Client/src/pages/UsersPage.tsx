import Users from "@components/Users/Users.tsx";
import {useState} from "react";
import {PaginationState, SortingState} from "@tanstack/react-table";
import {useUsers} from "@hooks/useUserQuery.ts";
import UserDetails from "@components/Users/UserDetails.tsx";
import {useUserDetails} from "@hooks/useUserDetailsQuery.ts";

const UsersPage = () => {
    const [sorting, setSorting] = useState<SortingState> ([]);
    const [pagination, setPagination] = useState<PaginationState>(
        {
            pageIndex: 0,
            pageSize:10
        }
    )

    const dataQueryUsers = useUsers({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        desc: sorting[0]?.desc ?? true
    })

    const [userDetailsId, setUserDetailsId] = useState<string|null>(null);

    const dataQueryUserDetails = useUserDetails(userDetailsId);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center p-5 flex-wrap">
                <div className="flex-1 bg-white p-3 rounded-md m-1">
                    {dataQueryUsers.isLoading ?
                        (
                            <div className="flex justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        ):
                        (
                            <Users
                                dataQuery={dataQueryUsers.data}
                                sorting={sorting}
                                setSorting={setSorting}
                                pagination={pagination}
                                setPagination={setPagination}
                                onChangeUserDetails={setUserDetailsId}
                            />
                        )
                    }
                </div>
                <div className="flex-1 bg-white p-3 rounded-md m-1 self-start">
                    {dataQueryUsers.isLoading ?
                        (
                            <div className="flex justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        ):
                        (<UserDetails dataQuery={dataQueryUserDetails.data} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default UsersPage;