import {RecipeDetailsDto} from "@api/terminalSchemas.ts";

export interface RecipeDetailsProps {
    dataQuery: RecipeDetailsDto | undefined;
}

const ProjectDetails = (props: RecipeDetailsProps) => {

    return (
        <div className="card-body">
            <div className="card-title text-4xl">Details</div>
            <div className="divider"></div>
            <div className="grid grid-cols-[35%_65%] gap-y-3">
                <div className="font-bold">Name:</div>
                <div>{props.dataQuery?.name}</div>
                {/* STEPS COMPONENT*/}
            </div>
        </div>
    )
};

export default ProjectDetails;