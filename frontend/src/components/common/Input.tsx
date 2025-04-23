import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  icon?: React.ReactNode;
  required?: boolean;
  label?: string;
  error?: string;
}

export default function Input({
  type,
  placeholder,
  onChange,
  value,
  name,
  icon,
  required = false,
  label,
  error,
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          required={required}
          className={`w-full bg-slate-800/50 border ${
            error ? 'border-red-500' : 'border-slate-700'
          } text-white rounded-lg py-3 px-4 ${
            icon ? 'pl-10' : ''
          } focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}