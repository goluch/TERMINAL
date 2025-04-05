import { UseQueryResult } from "react-query";
import { SampleDto } from "@api/terminalSchemas";

export interface SampleDetailsProps {
    dataQuery: UseQueryResult<SampleDto>;
}

const SampleDetails = (props: SampleDetailsProps) => {
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
      <p>Created: {props.dataQuery.data?.createdAt?.toLocaleDateString()}</p>
      <p>Tags: {props.dataQuery.data?.tags?.join(", ")}</p>
      <p>Comment: {props.dataQuery.data?.comment}</p>
      <p>Number of steps: {props.dataQuery.data?.steps?.length}</p>
    </div>
  );
};

export default SampleDetails;
