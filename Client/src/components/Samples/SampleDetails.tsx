import {SampleDetailsDto} from "@api/terminalSchemas.ts";
import {Button} from "@headlessui/react";
import {toastPromise} from "../../utils/toast.utils.tsx";
import {ClockIcon, TagIcon, ChatBubbleBottomCenterTextIcon, NumberedListIcon} from "@heroicons/react/16/solid";
import {EyeDropperIcon} from "@heroicons/react/20/solid";
import {AxiosResponse} from "axios";

export interface SampleDetailsProps {
    dataQuery: SampleDetailsDto | undefined;
    mutateAsync: (id: string) => Promise<AxiosResponse>;
    isPending: boolean;
}

/**
 * SampleDetails Component
 *
 * Displays details of a sample including code, creation date, tags, comment, and number of steps.
 * Provides a button to delete the sample.
 *
 * @component
 * @param {SampleDetailsProps} props - The properties for the component.
 */
const SampleDetails = (props: SampleDetailsProps) => {

    const date = new Date(props.dataQuery?.createdAtUtc ?? "");

    const handleDeletion = async () => {
        if (props.dataQuery?.id === undefined) return null;
        try {
            await toastPromise(
                props.mutateAsync(props.dataQuery.id),
                {
                    loading: "Deleting sample...",
                    success: "Deletion successful",
                    error: "Deletion failed",
                }
            );
        } catch {
            // Error is handled by toastPromise
        }
    }

    return (
        <div className="border border-gray-200 rounded-lg bg-white">
            <div className="text-lg font-medium border-b border-gray-200 h-[40.5px] p-2 flex">
                Details
            </div>
            <div className="p-4 space-y-3 font-light text-sm text-gray-600">

                <div className="flex items-center ">
                    <EyeDropperIcon className="w-6 h-6 pr-2"/>
                    <p className="font-medium flex items-center pr-1">
                        Sample Code: {props.dataQuery?.code}
                    </p>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="w-6 h-6 pr-2"/>
                    <p className="font-medium flex items-center pr-1">Created:</p>
                    <p>
                        {`
                ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
            `}
                    </p>
                </div>
                <div className="flex items-center ">
                    <TagIcon className="w-6 h-6 pr-2"/>
                    <div className="font-medium flex items-center pr-1">Tags:</div>
                    <div className="flex gap-1">
                        {props.dataQuery?.tags?.map((tag) => (
                            <div
                                key={tag.id}
                                className="border border-gray-200 hover:cursor-default p-1 w-fit rounded-2xl text-xs"
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center font-light text-sm text-gray-600">
                    <ChatBubbleBottomCenterTextIcon className="w-6 h-6 pr-2"/>
                    <div className="font-medium pr-1">Comment:</div>
                    <div>{props.dataQuery?.comment}</div>
                </div>
                <div className="flex items-center font-light text-sm text-gray-600">
                    <NumberedListIcon className="w-6 h-6 pr-1"/>
                    <div className="font-medium pr-2">Number of steps:</div>
                    <div>{props.dataQuery?.steps?.length}</div>
                </div>
                <div className="mt-6 flex gap-2">
                    {props.dataQuery && (
                        <Button className="btn btn-sm btn-error text-white rounded" onClick={handleDeletion}
                                disabled={props.isPending}>
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SampleDetails;
