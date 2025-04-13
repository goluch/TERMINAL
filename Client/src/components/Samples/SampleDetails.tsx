import { SampleDetailsDto } from "@api/terminalSchemas.ts";

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
      <div className="p-2 flex flex-col gap-3">
        <div className="font-bold">Sample Code: {props.dataQuery?.code}</div>
        <div className="flex">
          <p className="font-medium font-md">Created:</p>
          <p>
            {`
                ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
            `}
          </p>
        </div>
        <div className="flex">
          <div className="font-bold flex items-center">Tags:</div>
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
        <div className="flex">
          <div className="font-bold">Comment:</div>
          <div>{props.dataQuery?.comment}</div>
        </div>
        <div className="flex">
          <div className="font-bold">Number of steps: </div>
          <div>{props.dataQuery?.steps?.length}</div>
        </div>
      </div>
    </div>
  );
};

export default SampleDetails;
