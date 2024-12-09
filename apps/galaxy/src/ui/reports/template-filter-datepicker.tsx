'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getCalendarDate, getCalendarDateLabel } from '@/utils';
import {TextField} from '@radix-ui/themes'
import {useFormContext} from 'react-hook-form'

type TemplateDatePickerProps = {
  title: string;
  name: string;
};

const TemplateFilterDatePicker = ({title, name}: TemplateDatePickerProps) => {
  const {register} = useFormContext();
  const today = getCalendarDate()
  return (
    <FormFieldContainer className="w-full flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">
        {title}
      </FormFieldLabel>

      <TextField.Root
        type="date"
        className="border-pp-gray-2 h-6"
        {...register(name)}
        min={getCalendarDateLabel(today.subtract({ years: 40 }))}
        max={getCalendarDateLabel(today.add({ years: 100 }))}
      />
      <FormFieldError name={name} />
    </FormFieldContainer>
  )
}

export {TemplateFilterDatePicker}