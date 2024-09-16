import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { Flex, Text } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils';

interface RadioGroupProps {
  field: string;
  options: RadioGroupOption[];
  className?: string;
}

interface RadioGroupOption {
  label: string;
  value: string;
}

const RadioButton = ({ field, options, className }: RadioGroupProps) => {
  const { watch, setValue } = useFormContext();
  const value = watch(field);

  return (
    <RadixRadioGroup.Root
      className={className}
      value={value}
      onValueChange={(newValue) => setValue(field, newValue)}
    >
      {options.map(({ label, value: optionValue }) => {
        const id = `${field}-${optionValue}`;
        const isSelected = value === optionValue;

        return (
          <Flex key={optionValue} align="center" asChild>
            <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
              <RadixRadioGroup.Item
                id={id}
                value={optionValue}
                className={cn(
                  'rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9',
                  isSelected && 'border-blue-11 bg-blue-11'
                )}
              >
                <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
              </RadixRadioGroup.Item>
              <Text size="2" className={isSelected ? 'font-bold' : undefined}>
                {label}
              </Text>
            </label>
          </Flex>
        );
      })}
    </RadixRadioGroup.Root>
  );
};

export { RadioButton };
