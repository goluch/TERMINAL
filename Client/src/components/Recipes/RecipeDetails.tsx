import {RecipeDetailsDto} from "@api/terminalSchemas.ts";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import Step from "@components/Recipes/Step.tsx";

export interface RecipeDetailsProps {
    dataQuery: RecipeDetailsDto | undefined;
}

const ProjectDetails = (props: RecipeDetailsProps) => {

    return (
        <div className="card-body">
            <div className="card-title text-4xl">Details</div>
            <div className="divider"></div>
            <div className="grid grid-cols-[25%_75%] gap-y-3 mb-2">
                <div className="font-bold">Name:</div>
                <div>{props.dataQuery?.name}</div>
                <div className="font-bold">Steps:</div>
            </div>
            <TabGroup  className="w-full">
                <TabList className="flex tabs tabs-bordered">
                    {props.dataQuery?.steps.map((_step, index)=>
                         <Tab key={index} className="tab flex-1 focus:outline-none">Step {index + 1}</Tab>
                    )}
                </TabList>
                <TabPanels>
                    {props.dataQuery?.steps.map((step, index)=>
                        <TabPanel key={index}>
                            <Step step={step} />
                        </TabPanel>
                    )}
                </TabPanels>
            </TabGroup>
        </div>
    )
};

export default ProjectDetails;