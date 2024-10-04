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
      <FormFieldLabel>{title}</FormFieldLabel>
      <SelectInput
        field={title}
        buttonClassName="border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-full"
        options={options}
        {...register(name)}
      />
    </FormFieldContainer>
  )
}

export { TemplateSelect };

