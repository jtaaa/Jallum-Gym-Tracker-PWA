export interface TextListProps {
  renderPrefix?: (index: number) => string;
  children: Array<string>;
}
