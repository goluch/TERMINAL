import {UseQueryResult} from "@tanstack/react-query";
import {SampleDetailsDto} from "@api/terminalSchemas.ts";


export interface SampleDetailsProps {
  dataQuery: UseQueryResult<SampleDetailsDto, Error>;
}

const SampleDetails = (props: SampleDetailsProps) => {

    const date = new Date (props.dataQuery.data?.createdAtUtc ?? "");

  if (props.dataQuery.isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  return (
    <div className="card-body">
      <h2 className="card-title text-2xl">Details</h2>
      <div className="divider"></div>
      <p>Sample Code: {props.dataQuery.data?.code}</p>
      <p>Created:
          {`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      </p>
      <p>Tags: {props.dataQuery.data?.tags?.map((tag) => ` ${tag.name} `)}</p>
      <p>Comment: {props.dataQuery.data?.comment}</p>
      <p>Number of steps: {props.dataQuery.data?.steps?.length}</p>
    </div>
  );
};

export default SampleDetails;
