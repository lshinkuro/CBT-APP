import React, { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
}

const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search...",
  containerClassName = "w-1/3",
  className,
  ...props 
}: SearchInputProps) => {
  return (
    <div className={containerClassName}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl 
            focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 
            placeholder-gray-400 shadow-sm ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default SearchInput;