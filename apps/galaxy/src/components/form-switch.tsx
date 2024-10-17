'use client';

import { Flex, Switch } from '@radix-ui/themes';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/utils';

interface FormSwitchProps {
  field: string;
  className?: string;
  color?: 'blue' | 'gray' | 'gold' | 'green' | 'red' | 'orange';
}

const FormSwitch = ({ field, className, color = 'blue' }: FormSwitchProps) => {
  const form = useFormContext();

  return (
    <Flex className={cn(className)} justify="between" align="center">
      <Flex className="flex-row gap-1.5 justify-between w-full">
        <Controller
          name={field}
          control={form.control}
          render={({ field }) => (
            <Switch
              size="1"
              color={color}
              checked={field.value}
              onCheckedChange={(check) => field.onChange(check)}
            />
          )}
        />
      </Flex>
    </Flex>
  );
};

export { FormSwitch };
