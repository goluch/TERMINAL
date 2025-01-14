import { Button } from '@headlessui/react';

interface SubmitButtonProps {
  label: string;
}

const SubmitButton = ({ label }: SubmitButtonProps) => (
  <div className="w-full">
    <Button
      type="submit"
      className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-600 py-2 px-4 text-base font-medium text-white shadow-inner shadow-white/10 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
    >
      {label}
    </Button>

    <div className="text-sm mt-3 text-center">
      <span className="text-gray-600">Don't have an account yet? </span>
      <a
        href="#"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Sign up
      </a>
    </div>
  </div>
);

export default SubmitButton;
