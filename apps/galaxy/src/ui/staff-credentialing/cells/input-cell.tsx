import { TextField } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils';
import { ComponentProps } from 'react';

interface InputCellProps extends ComponentProps<typeof TextField.Root> {
  field: string;
}

const InputCell = ({
  className,
  defaultValue,
  disabled,
  field,
  placeholder = '',
}: InputCellProps) => {
  const { register } = useFormContext();

  return (
    <TextField.Root
      {...register(field)}
      className={cn('h-5 w-full text-gray-12', className)}
      defaultValue={defaultValue}
      disabled={disabled}
      placeholder={placeholder}
      size="1"
    />
  );
};

export { InputCell };
