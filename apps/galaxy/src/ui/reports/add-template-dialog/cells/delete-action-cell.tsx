import { DeleteIcon } from '@/components/icons';
import { Flex } from '@radix-ui/themes';

interface DeleteActionCellProps {
  index: number;
  remove: (index: number) => void;
}

const DeleteActionCell = ({ index, remove }: DeleteActionCellProps) => (
  <Flex justify="center" align="center" className='mx-auto' onClick={() => remove(index)} >
    <DeleteIcon className="cursor-pointer text-pp-icon-sub bg-pp-icon-sub" />
  </Flex>
);

export { DeleteActionCell };

