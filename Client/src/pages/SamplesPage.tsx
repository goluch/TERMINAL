import { SampleDetailsDto, SampleDto } from "../api/terminalSchemas";
import { useState } from "react";
import SamplesTable from "../components/Samples/SamplesTable";
import SampleDetails from "../components/Samples/SampleDetails";

const samplesData: SampleDto[] = [
  { code: "AS1", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS2", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS3", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS4", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS5", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS6", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS7", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS8", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS9", projectName: "TEST", createdAt: new Date("2021-09-01") },
  { code: "AS10", projectName: "TEST", createdAt: new Date("2021-09-01") },
];

const SamplesPage = () => {
  const [sampleDetails, setSampleDetails] = useState<SampleDetailsDto | null>({
    ...samplesData[0],
    comment: "This is a test comment",
    steps: [],
    tags: ["newsample, high-pressure"],
  });

  const changeSampleDetails = (code: string) => {
    // TODO: fetch details from API
    const foundSample = samplesData.find((sample) => sample.code === code);

    if (foundSample) {
      setSampleDetails({
        ...foundSample,
        comment: "Default comment",
        steps: [],
        tags: [],
      });
    }
  };

  return (
    <div className="flex justify-center  bg-gray-100 p-5">
      <div className="flex-auto bg-white p-3 rounded-md m-1">
        <SamplesTable
          samplesData={samplesData}
          onChangeSampleDetails={changeSampleDetails}
        />
      </div>
      <div className="flex-auto bg-white p-3 rounded-md m-1">
        <SampleDetails sampleDetails={sampleDetails} />
      </div>
    </div>
  );
};

export default SamplesPage;
