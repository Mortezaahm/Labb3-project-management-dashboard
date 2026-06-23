import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-lg
        border
        border-gray-300
        bg-white
        px-4
        py-2
        mb-4
        text-gray-900

        placeholder:text-gray-400

        focus:outline-none
        focus:ring-2
        focus:ring-blue-500

        dark:border-gray-600
        dark:bg-gray-700
        dark:text-white

        ${className}
      `}
    />
  );
}
