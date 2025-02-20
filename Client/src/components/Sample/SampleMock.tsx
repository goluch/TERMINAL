import React, { useState } from "react";
import SampleDetails from "./SampleDetails";

interface Sample {
    code: string;
    created: string;
    tags: string[];
    comment: string;
    steps: number;
}

/**
 * SampleMock Component
 *
 * A mock component that displays the details of a sample.
 *
 * @component
 * @returns {JSX.Element} - The rendered SampleDetailsMock component.
 */
const SampleMock: React.FC = () => {
    const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  
    const mockSample = {
      code: 'AX43',
      created: 'Dec 8, 2022, 2:24:16 PM',
      tags: ['high-pressure', 'non-sample', 'cinnamon'],
      comment: 'First sample!',
      steps: 0
    };
  
    const handleShowDetails = () => {
      setSelectedSample(mockSample);
    };
  
    const handleCloseDetails = () => {
      setSelectedSample(null);
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button className="btn btn-primary" onClick={handleShowDetails}>
          Show Sample Details
        </button>
        {selectedSample && (
          <SampleDetails sample={selectedSample} onClose={handleCloseDetails} />
        )}
      </div>
    );
  };
  
  export default SampleMock;