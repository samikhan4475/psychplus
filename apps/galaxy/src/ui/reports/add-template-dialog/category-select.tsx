'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components';
import { useStore } from '../store';
const CategorySelect = () => {
  const { reports } = useStore();
  const categoryOptions = reports?.map((code) => ({
    label: code.displayName,
    value: code.code,
  }))
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Category
      </FormFieldLabel>
      <SelectInput
        field="reportCategoryCode"
        className='w-full'
        buttonClassName=" w-full h-6 border-pp-gray-2 rounded-2 !outline-none"
        options={categoryOptions}
      />
      <FormFieldError name="reportCategoryCode" />
    </FormFieldContainer>
  )
}

export { CategorySelect };
