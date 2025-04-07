import {SampleStepDto} from "@api/terminalSchemas.ts";

interface StepProps {
    step: SampleStepDto;
}

const Step = (props: StepProps) => {

    return (
        <div className="overflow-x-auto mt-2">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Unit</th>
                </tr>
                </thead>
                <tbody>
                {props.step.parameters?.map((param, index)=>{
                    return (
                        <tr key={index}>
                            <td>{param?.name}</td>
                            <td>{param?.value}</td>
                            <td>{param?.unit}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Step;