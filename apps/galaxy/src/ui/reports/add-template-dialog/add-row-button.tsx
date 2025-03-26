import { Button, Flex, Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

interface AddRowButtonProps {
  onAddRow: () => void;
  disabled?: boolean;
}

const AddRowButton = ({ onAddRow, disabled }: AddRowButtonProps) => (
  <Flex gap="2" align="center" className="text-[12px] py-2">
    <Text className="!text-1" weight="medium">Run Parameters</Text>
    <Button
      variant="outline"
      color="gray"
      type='button'
      className="h-6 cursor-pointer bg-white px-2 text-[12px] text-black"
      onClick={onAddRow}
      disabled={disabled} 
    >
      <PlusIcon width={12} height={12} />
      Add
    </Button>
  </Flex>
);

export { AddRowButton };
