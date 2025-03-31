import {ProjectDetailsDto} from "@api/terminalSchemas.ts";


export interface ProjectDetailsProps {
    dataQuery: ProjectDetailsDto | undefined;
}

const ProjectDetails = (props: ProjectDetailsProps) => {

    return (
        <div className="card-body">
            <div className="card-title text-4xl">Details</div>
            <div className="divider"></div>
            <div className="grid grid-cols-[35%_65%] gap-y-3">
                <div className="font-bold">Name:</div>
                <div>{props.dataQuery?.name}</div>
                <div className="font-bold">Is Active:</div>
                <div>{(props.dataQuery?.isActive) ? ("Yes") : ("No")}</div>
                <div className="font-bold">Amount of samples:</div>
                <div>{props.dataQuery?.samplesIds.length}</div>
            </div>
        </div>
    );
};

export default ProjectDetails;