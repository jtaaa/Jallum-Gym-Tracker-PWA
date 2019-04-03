import React, { FunctionComponent, ChangeEvent } from 'react';
import './TextInput.scss';
import { TextInputProps } from './TextInput.types';

const TextInput: FunctionComponent<TextInputProps> = ({ value, onChange, autoFocus }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, e);
  return (
    <div className="TextInput">
      <input
        className="TextInput-input"
        type="text"
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default React.memo(TextInput);
