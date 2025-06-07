import {useState, useEffect} from "react";
import {ProjectDetailsDto} from "@api/terminalSchemas.ts";
import { DialogButton, DialogComp } from "@components/Shared/DialogComp";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import InputField from "@components/Shared/InputField.tsx";
import { Field, Label, Switch} from "@headlessui/react";
import clsx from "clsx";

export interface ProjectDetailsProps {
    project: ProjectDetailsDto;
    onSubmit: (id: string, name: string, isActive: boolean) => void;
    open: boolean;
    setOpen: (arg0: boolean) => void;
}

/**
 * ProjectDetails Component
 *
 * Displays details of a project including name, samples and activity.
 * Provides functionality to reset changes, submit changes, change activity and name.
 *
 * @component
 */
const ProjectDetails = (props: ProjectDetailsProps) => {
    const [isChanged, setIsChanged] = useState(false);
    const [name, setName] = useState(props.project?.name);
    const [isActive, setActive] = useState(props.project?.isActive)

    useEffect(() => {
        setName(props.project?.name || "")
        setActive(props.project?.isActive || false)
        setIsChanged(false);
    }, [props.project]);

    const handleReset = () => {
        setName(props.project?.name)
        setIsChanged(false);
    };

    return (
        <DialogComp
            isOpen={props.open}
            setIsOpen={props.setOpen}
            title={"Edit project"}
        >
            <InputField
                label="Name"
                id="name"
                type="email"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setIsChanged(true);
                }}
            />
            <Field className="h-fit flex flex-col">
                <Label className="text-sm font-normal font-sans text-gray-700">
                    Active:
                </Label>
                <Switch
                    checked={isActive}
                    onChange={() =>{
                        setActive(!isActive)
                        setIsChanged(true)
                    } }
                    className={'toggle rounded-full toggle-success toggle-lg'}
                >
                    <span
                        className={clsx('size-4 rounded-full bg-white transition',
                            isActive ? 'translate-x-6' : 'translate-x-1')}
                    >
                    </span>
                </Switch>
            </Field>
            <div className="flex flex-col gap-2 mt-4">
                <div className="flex gap-1">
                    <DialogButton
                        disabled={!isChanged}
                        className="hover:border-blue-400 "
                        onClick={() => props.onSubmit(props.project.id, name, isActive)}
                    >
                        Submit changes
                    </DialogButton>
                    <DialogButton
                        disabled={!isChanged}
                        className="!w-fit hover:border-blue-400"
                        onClick={handleReset}
                    >
                        <ArrowPathIcon className="h-4 w-4" />
                    </DialogButton>
                </div>
            </div>
        </DialogComp>
    );
};

export default ProjectDetails;
