import { SampleDetailsDto } from "@api/terminalSchemas.ts";
import { DialogComp } from "@components/Shared/DialogComp";
import {
  ClockIcon,
  TagIcon,
  ChatBubbleBottomCenterTextIcon,
  NumberedListIcon,
} from "@heroicons/react/16/solid";
import { EyeDropperIcon } from "@heroicons/react/20/solid";

export interface SampleDetailsProps {
  sample: SampleDetailsDto | undefined;
  open: boolean;
  openChange: (arg0: boolean) => void;
}

/**
 * SampleDetails Component
 *
 * Displays details of a sample including code, creation date, tags, comment, and number of steps.
 * Provides a button to delete the sample.
 *
 * @component
 * @param {SampleDetailsProps} - The properties for the component.
 */
const SampleDetails = ({ sample, open, openChange }: SampleDetailsProps) => {
  const date = new Date(sample?.createdAtUtc ?? "");

  return (
    <DialogComp isOpen={open} setIsOpen={openChange} title="Sample details">
      <div className="p-4 space-y-3 font-light text-sm text-gray-600">
        <div className="flex items-center ">
          <EyeDropperIcon className="w-6 h-6 pr-2" />
          <p className="font-medium flex items-center pr-1">
            Sample Code: {sample?.code}
          </p>
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-6 h-6 pr-2" />
          <p className="font-medium flex items-center pr-1">Created:</p>
          <p>
            {`
                ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
            `}
          </p>
        </div>
        <div className="flex items-center ">
          <TagIcon className="w-6 h-6 pr-2" />
          <div className="font-medium flex items-center pr-1">Tags:</div>
          <div className="flex gap-1">
            {sample?.tags?.map((tag) => (
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
          <ChatBubbleBottomCenterTextIcon className="w-6 h-6 pr-2" />
          <div className="font-medium pr-1">Comment:</div>
          <div>{sample?.comment}</div>
        </div>
        <div className="flex items-center font-light text-sm text-gray-600">
          <NumberedListIcon className="w-6 h-6 pr-1" />
          <div className="font-medium pr-2">Number of steps:</div>
          <div>{sample?.steps?.length}</div>
        </div>
      </div>
    </DialogComp>
  );
};

export default SampleDetails;
