import { TextCell } from '@/components';

interface SerialNumberCellProps {
  index: number;
}

const SerialNumberCell = ({ index }: SerialNumberCellProps) => (
  <TextCell>{index + 1}</TextCell>
);

export { SerialNumberCell };
