import {SampleDetailsDto} from "@api/terminalSchemas.ts";
import {ClockIcon, TagIcon, ChatBubbleBottomCenterTextIcon, NumberedListIcon} from "@heroicons/react/16/solid";
import {EyeDropperIcon} from "@heroicons/react/20/solid";

export interface SampleDetailsProps {
    dataQuery: SampleDetailsDto | undefined;
}

const SampleDetails = (props: SampleDetailsProps) => {
    const date = new Date(props.dataQuery?.createdAtUtc ?? "");

    return (
        <div className="border border-gray-200 rounded-lg bg-white">
            <div className="text-lg font-medium border-b border-gray-200 h-[40.5px] p-2 flex">
                Details
            </div>
            <div className="bg-white p-4 space-y-3">

                <div className="flex items-center font-light text-sm text-gray-600">
                    <EyeDropperIcon className="w-6 h-6 pr-2"/>
                    <p className="font-medium flex items-center pr-1">
                        Sample Code: {props.dataQuery?.code}
                    </p>
                </div>
                <div className="flex items-center font-light text-sm text-gray-600">
                    <ClockIcon className="w-6 h-6 pr-2"/>
                    <p className="font-medium flex items-center pr-1">Created:</p>
                    <p>
                        {`
                ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
            `}
                    </p>
                </div>
                <div className="flex items-center font-light text-sm text-gray-600">
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
            </div>
        </div>
    );
};

export default SampleDetails;
