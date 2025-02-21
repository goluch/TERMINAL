import { React, useState } from "react";
import { Link } from "react-router-dom";

/**
 * SampleDetails Component
 *
 * A component that displays the details of a sample.
 *
 * @component
 * @returns {JSX.Element} - The rendered SampleDetails component.
 */
interface SampleProps {
    code: string;
    created: string;
    tags: string[];
    comment: string;
    steps: number;
}

const SampleDetails: React.FC = () => {

    const mockSample: SampleProps = {
        code: 'AX43',
        created: 'Dec 8, 2022, 2:24:16 PM',
        tags: ['high-pressure', 'non-sample', 'cinnamon'],
        comment: 'First sample!',
        steps: 0
    };

    return (
        <div className="fixed right-0 w-1/2 p-4 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Sample Details</h2>
            </div>
            <p><strong>Code:</strong> {mockSample.code}</p>
            <p><strong>Created:</strong> {mockSample.created}</p>
            <p><strong>Tags:</strong>
                {mockSample.tags.map((tag, index) => (
                    <span key={index} className="badge badge-neutral mx-1 bg-gray-300 text-black border-gray-300 rounded-xl">{tag}</span>
                ))}
            </p>
            <p><strong>Comment:</strong> {mockSample.comment}</p>
            <p><strong>Number of steps:</strong> {mockSample.steps}</p>
            <div className="flex justify-start mt-4 space-x-4">
                <Link to="/retry-sample" className="flex items-center text-blue-500 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Redo
                </Link>
                <Link to="/show-steps" className="flex items-center text-blue-500 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                    Show steps
                </Link>
            </div>
        </div>
    )
};

export default SampleDetails;