"use client";

import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  error?: string | null;
};

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className={className ? className : "w-full"}>
      {label ? <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label> : null}
      <input
        {...props}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      />
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </div>
  );
};

export default Input;