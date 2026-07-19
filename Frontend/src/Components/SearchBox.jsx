import React from "react";

export default function SearchBox({ label, placeholder, value, handleSearch }) {
  return (
    <div className="flex items-center gap-3 pl-4 flex-1">
      <label className="text-lg font-semibold text-primary dark:text-light shrink-0">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          className="px-4 py-2 pr-9 text-base border rounded-xl transition-all duration-200 border-light dark:border-gray-700 text-gray-800 dark:text-lighter bg-white dark:bg-gray-800/40 focus:outline-none focus:border-primary dark:focus:border-light focus:ring-4 focus:ring-primary/10 dark:focus:ring-light/10 placeholder-gray-400 dark:placeholder-gray-500 font-medium shadow-sm"
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleSearch(event.target.value)}
        />
        
        {/* Interactive Clear Button Component */}
        {value && (
          <button
            type="button"
            onClick={() => handleSearch("")}
            className="absolute right-3 p-0.5 text-gray-400 hover:text-primary dark:hover:text-light transition-colors duration-150 rounded-md cursor-pointer"
            aria-label="Clear search terms"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}