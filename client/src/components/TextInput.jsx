import React from "react";

const TextInput = ({ label, type = "text", placeholder, register, error }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full border rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
