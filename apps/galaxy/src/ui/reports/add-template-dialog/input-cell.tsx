import { TextField } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils';

interface InputCellProps {
  name: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const InputCell = ({
  name,
  className,
  placeholder = '',
  disabled,
  defaultValue,
}: InputCellProps) => {
  const { register } = useFormContext();

  return (
    <TextField.Root
      {...register(name)}
      defaultValue={defaultValue}
      size="1"
      placeholder={placeholder}
      disabled={disabled}
      className={cn('h-5 w-full text-gray-12', className)}
    />
  );
};

export { InputCell };
