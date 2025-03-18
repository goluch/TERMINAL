import React, { useState, useCallback } from "react";
import TerminalBanner from "@components/Shared/Forms/TerminalBanner.tsx";
import InputField from "@components/Shared/Forms/InputField.tsx";
import SubmitButton from "@components/Shared/Forms/SubmitButton.tsx";
import { useLoginMutation } from "@hooks/useLoginMutation.ts";
import { LoginRequest } from "@api/terminalSchemas";
import { Navigate, redirect } from "react-router-dom";

/**
 * LoginForm Component
 *
 * A form component for user login supporting email validation.
 *
 * @component
 * @param {LoginFormProps} props - The props for the LoginForm component
 */
const LoginForm = () => {
    const mutation = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const emailValid = validateEmail(email);

            setIsEmailValid(emailValid);

            if (!emailValid) {
                return;
            }

            const loginRequest: LoginRequest = {
                email: email,
                password: password,
            };

            await mutation.mutateAsync(loginRequest);

            if (mutation.isSuccess) {
                redirect("/");
            }
        },
        [mutation, email, password],
    );

    if (mutation.isSuccess) {
        return <Navigate to="/" />;
    }

    return (
        <div className="bg-white px-4 py-5 rounded-lg border-[1px] border-black/15 max-w-3xl w-full">
            <div className="flex gap-5 h-full">
                <div className="w-full flex-col gap-3 hidden sm:flex">
                    <div className="border-[1px] [background-size:16px_16px] h-full flex justify-center items-center border-black/15 rounded-md bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]">
                        <TerminalBanner />
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="py-8 w-full">
                        <p className="text-2xl font-normal text-center">Welcome back</p>
                        <p className="text-sm font-normal text-center text-gray-600">Sign in to your account</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-3">
                        <div className="flex flex-col">
                            <InputField
                                name="email"
                                type="text"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isValid={isEmailValid}
                            />
                            <InputField
                                name="password"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <SubmitButton label="Sign in" isLoading={mutation.isPending} />
                            <p className="text-xs p-0 font-normal text-center text-gray-600">Don't have an account? Ask for an invitation</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
