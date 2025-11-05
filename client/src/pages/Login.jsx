/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useSelector } from "react-redux";
const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const hasNavigated = useRef(false);
  const submitHandler = (data) => {
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo",JSON.stringify(data));
    console.log("Form Data : ", data);
    alert(JSON.stringify(data));
    navigate("/dashboard")
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] px-6 overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 flex flex-col items-center text-center lg:text-left space-y-4 animate-fade-in-left mt-10 lg:mt-0">
        <p className="text-gray-600 border  border-gray-400 rounded-2xl px-2 inline-block shadow">
          Manage all your tasks in one place
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight">
          Cloud-based <br /> Task Manager
        </h1>
        <div className="cell">
          <div className="circle rotate-in-up-left"></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center mt-10 lg:mt-0 animate-fade-in-right">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm transform transition-all duration-500 hover:scale-[1.02]">
          <h2 className="text-2xl font-bold text-blue-600 mb-1 text-center">
            Welcome back!
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Keep all your credentials safe!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <TextInput
              label="Email Address"
              type="email"
              placeholder="Enter your Email"
              register={register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be at most 20 characters only",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character",
                },
              })}
              error={errors.password?.message}
            />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
