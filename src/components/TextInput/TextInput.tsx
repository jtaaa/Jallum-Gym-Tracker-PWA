import React, { FunctionComponent, ChangeEvent } from 'react';
import './TextInput.scss';
import { TextInputProps } from './TextInput.types';

export const TextInput: FunctionComponent<TextInputProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, e);
  return (
    <div className="TextInput">
      <input
        className="TextInput-input"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default React.memo(TextInput);
