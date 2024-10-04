'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components';
import { TextField } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';

type TemplateInputProps = {
  title: string;
  name: string;
};

const TemplateFilterInput = ({ title, name }: TemplateInputProps) => {
  const { register } = useFormContext();

  return (
    <FormFieldContainer className="w-full flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">
        {title}
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder={title}
        {...register(name)}
      />
      <FormFieldError name={name} />
    </FormFieldContainer>
  )
}

export { TemplateFilterInput };
