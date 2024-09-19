import { DropdownMenu } from '@psychplus/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { EDIDropdownItem, EDIIconAction } from '../types';

interface Props {
  options: EDIDropdownItem[];
  onChange: (selectedValues: EDIIconAction) => void;
}

const EDIFormDropdown = ({ options, onChange }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="1" variant="ghost" mr="1">
          <DotsHorizontalIcon height={16} width={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map((item) => (
          <DropdownMenu.Item
            key={item.value}
            onSelect={() => onChange(item.value as EDIIconAction)}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export { EDIFormDropdown, type EDIDropdownItem };
