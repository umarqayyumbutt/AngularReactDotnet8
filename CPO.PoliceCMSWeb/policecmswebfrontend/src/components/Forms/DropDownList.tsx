import React from 'react';
import { DropDownData } from '../../types/DropDownData';

interface DropDownListProps {
  options: DropDownData[];
  label: string;
  selectedValue: string; // Pass selected value from the parent
  onOptionChange: (selectedOption: string) => void;  // Callback to update the parent state
}

const DropDownList: React.FC<DropDownListProps> = ({ options, label, onOptionChange, selectedValue }) => {
  //const [selectedOption, setSelectedOption] = React.useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = React.useState<boolean>(false);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    const value = e.target.value;
    //setSelectedOption(value);
    setIsOptionSelected(true);
    onOptionChange(value);  // Update parent component's state
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label}</label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <select
          value={selectedValue}
          onChange={handleOptionChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          {/* <option value="" disabled className="text-body dark:text-bodydark">
            Select an option
          </option> */}
          {options.map((option) => (
            <option key={option.id} value={option.id} className="text-body dark:text-bodydark">
              {option.name}
            </option>
          ))}
        </select>

        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default DropDownList;