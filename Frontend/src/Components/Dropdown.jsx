import React from "react";

export default function Dropdown({
  label,
  options,
  selectedValue,
  handleSort,
}) {
  return (
    <div className="flex items-center gap-2 justify-end pr-12 flex-1">
      <label className="text-lg font-semibold text-primary dark:text-light shrink-0">
        {label}
      </label>
      <div className="relative flex items-center">
        <select
          className="pl-3 pr-9 py-2 text-base border rounded-xl transition-all duration-200 border-light dark:border-gray-700 text-gray-800 dark:text-lighter bg-white dark:bg-gray-800/40 focus:outline-none focus:border-primary dark:focus:border-light focus:ring-4 focus:ring-primary/10 dark:focus:ring-light/10 font-medium shadow-sm cursor-pointer appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235B21B6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1rem',
            backgroundRepeat: 'no-repeat'
          }}
          value={selectedValue}
          onChange={(event) => handleSort(event.target.value)}
        >
          {options.map((optionVal, index) => (
            <option key={index} value={optionVal} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
              {optionVal}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}