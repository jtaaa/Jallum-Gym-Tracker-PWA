export interface OptionsListOption<T = any> {
  selected: boolean;
  value: string;
  extra?: T;
}

export interface OptionsListProps {
  handleClick?: (option: OptionsListOption) => void;
  options: Array<OptionsListOption>,
};
