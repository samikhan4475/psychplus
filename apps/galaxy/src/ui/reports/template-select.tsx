'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components';
import { useFormContext } from 'react-hook-form';

type TemplateSelectProps = {
  title: string;
  options: { label: string; value: string }[];
  name: string;
};

const TemplateSelect = ({ title, options, name }: TemplateSelectProps) => {
  const { register } = useFormContext();

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">{title}</FormFieldLabel>
      <SelectInput
        field={title}
        buttonClassName="border-pp-gray-2 h-6  w-full min-w-[120px] text-left"
        className="text-left"
        options={options}
        {...register(name)}
      />
    </FormFieldContainer>
  )
}

export { TemplateSelect };

