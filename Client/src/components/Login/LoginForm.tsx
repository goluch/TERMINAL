import React, { useState } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"success" | "error">("success");
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Temporary mock response
        const mockResponse = { success: true, token: "example-token" };

        setTimeout(() => {
            if (mockResponse.success) {
                setIsModalOpen(true);
                setModalMessage("You have successfully logged in!");
                setModalType("success");
                
                if (rememberMe) {
                    localStorage.setItem("authToken", mockResponse.token);
                  } else {
                    sessionStorage.setItem("authToken", mockResponse.token);
                  }
                
                navigate("/");
            } else {
                setIsModalOpen(true);
                setModalMessage("An error occurred. Please try again.");
                setModalType("error");
            }
            setIsModalOpen(true);
            setIsLoading(false);
        }, 2000);
    };

    const LoadingIndicator = () => (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );

    return (
        <>
            <form
                className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-center text-2xl font-bold text-gray-800">
                    Sign in to your account
                </h2>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        Your email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>
                <button
                    className={`flex w-full items-center justify-center px-4 py-2 text-white bg-gray-600 rounded-lg ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isLoading}
                    >
                   {isLoading ? <LoadingIndicator /> : <LockClosedIcon className="w-5 h-5 mr-2" />}
                   {isLoading ? 'Loading...' : 'Sign in'}
                </button>
            </form>

            <Transition
                show={isModalOpen}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 translate-y-[-50px]"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition ease-in duration-300"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 translate-y-[-50px]"
            >
                <div
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-96 p-4 rounded-lg shadow-lg ${
                    modalType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
                >
                <p className="text-center">{modalMessage}</p>
                </div>
            </Transition>
        </>
    )
};

export default LoginForm;