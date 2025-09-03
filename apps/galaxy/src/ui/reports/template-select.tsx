'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
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
  isRequired: boolean
  isUseLabelAsValue?: boolean
}

const TemplateSelect = ({
  title,
  options,
  name,
  isMultiple,
  isLoading,
  isRequired,
}: TemplateSelectProps) => {
  const { register, setValue, watch, getValues } = useFormContext()
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    getValues(name),
  )
  const isScheduleReport = name?.includes('scheduleParameterValue') ?? false

  useEffect(() => {
    if (!isLoading && getValues(name)?.[0] === 'all') {
      setSelectedOptions(options.map((option) => option.value))
    }
  }, [isLoading, options, getValues(name), setValue, name])

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
      setValue(name, '')
    }
  }, [getValues(name)])

  return (
    <FormFieldContainer
      className={`gap-1 ${
        !isScheduleReport ? 'flex-row items-baseline justify-start' : ''
      } w-full`}
    >
      <FormFieldLabel className="!text-1" required={isRequired}>
        {title}
      </FormFieldLabel>
      <Flex direction="column" className='w-full'>
        {isMultiple ? (
          <MultiSelectField
            {...register(name)}
            options={options}
            loading={isLoading}
            disabled={isLoading}
            includeAllOption
            defaultValues={isLoading ? [] : selectedOptions}
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
        <FormFieldError name={name} />
      </Flex>
    </FormFieldContainer>
  )
}

export { TemplateSelect }
