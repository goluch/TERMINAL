import React, { useState, useCallback } from "react";
import TerminalBanner from "../Shared/Forms/TerminalBanner.tsx";
import InputField from "../Shared/Forms/InputField.tsx";
import SubmitButton from "@components/Shared/Forms/SubmitButton.tsx";
import RememberMeButton from "./RememberMeButton";
import { useLoginMutation } from "@hooks/apiHooks";
import { LoginRequest } from "@api/terminalSchemas";
import { Navigate } from "react-router-dom";
import axios from "axios";

/**
 * LoginForm Component
 *
 * A form component for user login supporting email validation.
 *
 * @component
 * @param {LoginFormProps} props - The props for the LoginForm component
 * @returns {JSX.Element} - The rendered LoginForm component.
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
      axios.get("http://localhost:5006/api/ping").then((r) => {
        console.log(r);
      });

      const emailValid = validateEmail(email);

      setIsEmailValid(emailValid);

      if (!emailValid) {
        return;
      }

      const loginRequest: LoginRequest = {
        email: email,
        password: password,
        twoFactorCode: "",
        twoFactorRecoveryCode: "",
      };

      await mutation.mutateAsync(loginRequest);
    },
    [mutation, email, password],
  );

  if (mutation.isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <TerminalBanner />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
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
        <RememberMeButton />
        <SubmitButton label="Sign in" isLoading={mutation.isPending} />
      </form>
    </div>
  );
};

export default LoginForm;
