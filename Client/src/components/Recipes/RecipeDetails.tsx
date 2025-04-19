import {RecipeDetailsDto} from "@api/terminalSchemas.ts";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import Step from "@components/Recipes/Step.tsx";
import {IdentificationIcon} from "@heroicons/react/16/solid";

export interface RecipeDetailsProps {
    dataQuery: RecipeDetailsDto | undefined;
}

const ProjectDetails = (props: RecipeDetailsProps) => {

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-scroll h-full">
            <div className="text-lg font-medium border-b border-gray-200 h-[40.5px] p-2 flex">
                Details
            </div>
            <div className="bg-white p-4 space-y-3">
                <div className="flex items-center font-light text-sm text-gray-600">
                    <IdentificationIcon className="w-6 h-6 pr-2"/>
                    <div className="font-medium pr-1">Name:</div>
                    <div>{props.dataQuery?.name}</div>
                </div>
                <TabGroup className="">
                    <TabList className="flex tabs tabs-bordered">
                        {props.dataQuery?.steps.map((_step, index) =>
                            <Tab key={index} className="tab flex-1 focus:outline-none">Step {index + 1}</Tab>
                        )}
                    </TabList>
                    <TabPanels>
                        {props.dataQuery?.steps.map((step, index) =>
                            <TabPanel key={index}>
                                <Step step={step}/>
                            </TabPanel>
                        )}
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
};

export default ProjectDetails;