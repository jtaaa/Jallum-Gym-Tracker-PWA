export interface OptionsListOption {
  selected: boolean;
  value: string;
}

export interface OptionsListProps {
  handleClick?: (option: OptionsListOption) => void;
  options: Array<OptionsListOption>,
};
