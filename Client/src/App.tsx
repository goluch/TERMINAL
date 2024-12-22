import {CommandLineIcon} from "@heroicons/react/24/outline";

export default function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className="card-bordered rounded-lg bg-base-100 p-1">
            <div className="card-body">
                <div className="flex flex-row justify-between items-center g-1">
                    <p className="text-2xl">Terminal</p>
                    <CommandLineIcon className="h-6 w-6 mt-0.5"/>
                </div>
            </div>
        </div>
    </div>
  );
}
