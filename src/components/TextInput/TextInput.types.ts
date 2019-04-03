import { ChangeEvent } from "react";

export interface TextInputProps {
  value: string;
  onChange: (input: string, event?: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
};
