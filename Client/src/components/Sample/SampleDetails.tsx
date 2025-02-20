import { useState } from "react";

/**
 * SampleDetails Component
 *
 * A component that displays the details of a sample.
 *
 * @component
 * @returns {JSX.Element} - The rendered SampleDetails component.
 */
interface Sample {
    code: string;
    created: string;
    tags: string[];
    comment: string;
    steps: number;
}

interface SampleDetailsProps {
    sample: Sample;
    onClose: () => void;
}

const SampleDetails: React.FC<SampleDetailsProps> = ({ sample, onClose }) => {
    return (
        <div className="fixed top-0 right-0 m-4 w-1/3 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Sample Details</h2>
        <button className="btn btn-sm btn-circle btn-outline" onClick={onClose}>
          ✕
        </button>
      </div>
      <p><strong>Code:</strong> {sample.code}</p>
      <p><strong>Created:</strong> {sample.created}</p>
      <p><strong>Tags:</strong> {sample.tags.join(", ")}</p>
      <p><strong>Comment:</strong> {sample.comment}</p>
      <p><strong>Steps:</strong> {sample.steps}</p>
    </div>
    )
};

export default SampleDetails;