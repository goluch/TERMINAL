import React, { useState } from "react";
import TerminalBanner from "./TerminalBanner";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import RememberMeButton from "./RememberMeButton";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log(userData);
        }, 2000);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <TerminalBanner />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
                <InputField
                    name="email"
                    type="email"
                    label="Email"
                    value={userData.email}
                    onChange={handleChange}
                />
                <InputField
                name="password"
                type="password"
                label="Password"
                value={userData.password}
                onChange={handleChange}
                />
                <RememberMeButton />
                <SubmitButton label="Sign in" isLoading={isLoading} />
            </form>
        </div>
    )
};

export default LoginForm;