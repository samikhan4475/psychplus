import { DropdownMenu } from '@psychplus/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { SubmitterDropdownItem, SubmitterIconAction } from '../types';

interface Props {
  options: SubmitterDropdownItem[];
  onChange: (selectedValues: SubmitterIconAction) => void;
}

const SubmitterFormDropdown = ({ options, onChange }: Props) => {
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
            onSelect={() => onChange(item.value as SubmitterIconAction)}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export { SubmitterFormDropdown, type SubmitterDropdownItem };
