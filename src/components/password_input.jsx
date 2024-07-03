import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInput = ({ id, name, value, onChange }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-sky-500"
        placeholder="Enter password"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400 hover:text-gray-600"
        onClick={togglePasswordVisibility}
      >
        
  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-xl"/>

      </button>
    </div>
  );
};

export default PasswordInput;
