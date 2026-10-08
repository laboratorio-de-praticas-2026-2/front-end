"use client";

import { useState } from "react";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
}: PasswordInputProps) {
  const [visivel, setVisivel] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visivel ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 pr-11 rounded-lg border text-sm focus:outline-none focus:ring-1 ${
            error
              ? "border-red-400 focus:ring-red-400"
              : "border-zinc-300 focus:ring-blue-500"
          }`}
        />
        <button
          type="button"
          onClick={() => setVisivel((prev) => !prev)}
          aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-sm"
        >
          {visivel ? "🙈" : "👁️"}
        </button>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}