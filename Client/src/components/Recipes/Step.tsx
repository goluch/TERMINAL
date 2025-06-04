import {SampleStepDto} from "@api/terminalSchemas.ts";

interface StepProps {
    step: SampleStepDto;
}

/**
 * Step Component
 *
 * A component that displays a step in a recipe.
 * It renders a table with the parameters of the step, including their name, value, and unit.
 *
 * @component
  */
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