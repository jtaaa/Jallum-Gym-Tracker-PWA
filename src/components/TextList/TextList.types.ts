export interface TextListProps {
  limit?: number;
  children: Array<string>;
  renderPrefix?: (index: number) => string;
}
