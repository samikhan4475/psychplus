import { TextField } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils';
import { ComponentProps } from 'react';

interface InputCellProps extends ComponentProps<typeof TextField.Root> {
  field: string;
}

const InputCell = ({
  field,
  className,
  placeholder = '',
  disabled,
  defaultValue,
}: InputCellProps) => {
  const { register } = useFormContext();

  return (
    <TextField.Root
      {...register(field)}
      defaultValue={defaultValue}
      size="1"
      placeholder={placeholder}
      disabled={disabled}
      className={cn('h-5 w-full text-gray-12', className)}
    />
  );
};

export { InputCell };
