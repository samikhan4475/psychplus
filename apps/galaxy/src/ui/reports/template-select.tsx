'use client'

import { FormFieldContainer, FormFieldLabel, MultiSelectField, SelectInput } from '@/components';
import { useFormContext } from 'react-hook-form';

type TemplateSelectProps = {
  title: string;
  options: { label: string; value: string }[];
  name: string;
  isMultiple: boolean;
};

const TemplateSelect = ({ title, options, name, isMultiple }: TemplateSelectProps) => {
  const { register, setValue, watch } = useFormContext();
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">{title}</FormFieldLabel>
      {isMultiple ? (
        <MultiSelectField
          {...register(name)}
          options={options}
          className="border-pp-gray-2 h-6  w-full min-w-[120px] text-left"
          onChange={(values) => setValue(name, values)}
          menuClassName="min-w-[155px] max-w-[450px]"
        />
      ) : (
        <SelectInput
          field={title}
          buttonClassName="border-pp-gray-2 h-6  w-full min-w-[120px] text-left"
          className="text-left"
          options={options}
          {...register(name)}
          value={watch(name)}
          onValueChange={(value) => {
            setValue(name, value);
          }}
        />
      )}


    </FormFieldContainer>
  )
}

export { TemplateSelect };

