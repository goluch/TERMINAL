import {ProjectDetailsDto} from "@api/terminalSchemas.ts";
import {
    NumberedListIcon,
    IdentificationIcon,
    QuestionMarkCircleIcon
} from "@heroicons/react/16/solid";


export interface ProjectDetailsProps {
    dataQuery: ProjectDetailsDto | undefined;
}

const ProjectDetails = (props: ProjectDetailsProps) => {

    return (
        <div className="border border-gray-200 rounded-lg bg-white">
            <div className="text-lg font-medium border-b border-gray-200 h-[40.5px] p-2 flex">
                Details
            </div>
            <div className="bg-white p-4 space-y-3">
                <div className="flex items-center font-light text-sm text-gray-600">
                    <IdentificationIcon className="w-6 h-6 pr-2"/>
                    <div className="font-medium pr-1">Name:</div>
                    <div>{props.dataQuery?.name}</div>
                </div>
                <div className="flex items-center font-light text-sm text-gray-600">
                    <QuestionMarkCircleIcon className="w-6 h-6 pr-2"/>
                    <div className="font-medium pr-1">Is active:</div>
                    <div>{props.dataQuery?.isActive ? "Yes" : "No"}</div>
                </div>
                <div className="flex items-center font-light text-sm text-gray-600">
                    <NumberedListIcon className="w-6 h-6 pr-2"/>
                    <div className="font-medium pr-1">Amount of samples::</div>
                    <div>{props.dataQuery?.samplesIds.length}</div>
                </div>
            </div>
        </div>

    );
};

export default ProjectDetails;