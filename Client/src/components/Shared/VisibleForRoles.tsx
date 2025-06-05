import {ReactNode} from "react";
import {useUserRoles} from "@hooks/useUserRoles.ts";

export interface VisibleForRoleProps {
    roles: Array<string>,
    children: ReactNode
}

const VisibleForRoles = (props: VisibleForRoleProps) => {
    const userRole = useUserRoles();

    if(userRole && !props.roles.includes(userRole)){
        return <></>;
    }

    return (
        <>
            {props.children}
        </>
    );
};

export default VisibleForRoles;