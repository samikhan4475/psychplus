'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
  SelectInput,
} from '@/components'

type TemplateSelectProps = {
  title: string
  options: { label: string; value: string }[]
  name: string
  isMultiple: boolean
  isLoading?: boolean
}

const TemplateSelect = ({
  title,
  options,
  name,
  isMultiple,
  isLoading,
}: TemplateSelectProps) => {
  const { register, setValue, watch, getValues } = useFormContext()
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    getValues(name),
  )

  const handleOnChange = (values: string[]) => {
    const allValues = options.map((option) => option.value)

    if (
      values.length === allValues.length &&
      values.every((v) => allValues.includes(v))
    ) {
      setSelectedOptions(values)
      setValue(name, 'all')
    } else {
      setValue(name, values)
    }
  }

  useEffect(() => {
    if (getValues(name) === undefined || getValues(name).length === 0) {
      setSelectedOptions([])
    }
  }, [getValues(name)])

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">{title}</FormFieldLabel>
      {isMultiple ? (
        <MultiSelectField
          {...register(name)}
          options={options}
          loading={isLoading}
          disabled={isLoading}
          includeAllOption
          defaultValues={selectedOptions}
          className="border-pp-gray-2 h-6  w-full min-w-[120px] text-left"
          onChange={handleOnChange}
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
            setValue(name, value)
          }}
        />
      )}
    </FormFieldContainer>
  )
}

export { TemplateSelect }
