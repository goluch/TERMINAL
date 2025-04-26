import { Step } from "./Step";

export type Recipe = {
  id: string;
  name: string;
  steps: Step[];
};
