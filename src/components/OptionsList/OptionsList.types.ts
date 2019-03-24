export type OptionsListOptions = Array<{ selected: boolean, value: string}>;

export interface OptionsListProps {
  handleClick?: (value: string) => void;
  options: OptionsListOptions,
};
