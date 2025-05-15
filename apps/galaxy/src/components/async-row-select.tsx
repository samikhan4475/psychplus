'use client'

import React, { useEffect, useState } from 'react'
import { Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import { ChevronDown, PlusCircleIcon } from 'lucide-react'
import useOnclickOutside from 'react-cool-onclickoutside'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { ActionResult } from '@/api'
import { LoadingPlaceholder } from '@/components'
import { cn } from '@/utils'

interface Option {
  label: string
  value: string
}

type Unit = 'px' | 'ch' | 'in' | 'rem' | 'em'
interface AsyncRowSelectProps
  extends React.ComponentProps<typeof TextField.Root> {
  fetchOptions: (value: string) => Promise<ActionResult<Option[]>>
  placeholder?: string
  onRowClick: (value: Option) => void
  disabled?: boolean
  className?: string
  defaultValue?: string
  allowMultiple?: boolean
  label?: string
  defaultWidth?: `w-[${number}${Unit}]` | `w-${number}`
  disabledOptions?: string[]
}

interface RowOptionProps {
  option: Option
  onOptionClick: (option: Option) => void
  disabledOptions?: string[]
}

const RowOption = ({
  option,
  onOptionClick,
  disabledOptions,
}: RowOptionProps) => (
  <Flex
    justify="between"
    align="center"
    p="1"
    onClick={() => onOptionClick(option)}
    className={cn(
      'hover:bg-pp-bg-accent cursor-default rounded-2',
      disabledOptions?.includes(option.value) &&
        'pointer-events-none opacity-40',
    )}
  >
    <Text className="w-[85%] text-[11px]">{option.label}</Text>
    <PlusCircleIcon stroke="#194595" strokeWidth="2" height="15" width="15" />
  </Flex>
)

const AsyncRowSelect = ({
  fetchOptions,
  onRowClick,
  placeholder,
  className,
  disabled,
  label,
  allowMultiple,
  defaultValue,
  defaultWidth,
  disabledOptions,
  ...textFieldProps
}: AsyncRowSelectProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const [value, setValue] = useState(defaultValue ?? '')
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<Option[]>()
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const debouncedFetch = useDebouncedCallback(async (searchTerm: string) => {
    const result = await fetchOptions(searchTerm)
    if (result?.state === 'success') {
      setOptions(result.data)
    } else if (result?.state === 'error') {
      toast.error(result.error)
    }
    setLoading(false)
  }, 500)

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setShowOptions(true)
    const searchTerm = e.target.value
    debouncedFetch(searchTerm)
    setValue(searchTerm)
  }

  useEffect(() => {
    debouncedFetch(defaultValue ?? '')
  }, [debouncedFetch, defaultValue])

  const onOptionClick = (option: Option) => {
    if (!allowMultiple) setShowOptions(false)

    if (allowMultiple) {
      setSelectedOptions([...selectedOptions, option])
    }

    onRowClick(option)
  }

  const ref = useOnclickOutside(() => {
    setSelectedOptions([])
    setValue('')
    setShowOptions(false)
  })

  return (
    <Box ref={ref} className="z-20">
      <Flex
        className="relative w-full flex-wrap overflow-y-auto pr-3"
        align="center"
      >
        <TextField.Root
          {...textFieldProps}
          className={cn(
            `border-pp-gray-2 h-6 ${
              defaultWidth ?? 'w-[300px]'
            } border border-solid pr-4 !outline-none [box-shadow:none] disabled:bg-gray-3 disabled:text-gray-11`,
            disabled ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
            className,
          )}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder ?? 'Search'}
          onChange={onChange}
          onFocus={() => setShowOptions(true)}
        />
        <ChevronDown
          className="text-pp-gray-1 absolute right-4 top-1/2 -translate-y-1/2"
          size="15"
        />
      </Flex>

      {showOptions && (
        <Box
          className={`bg-white !fixed mx-auto flex h-auto max-h-48 ${
            defaultWidth ?? 'w-[280px]'
          } flex-col  rounded-3 shadow-3  ${loading ?? 'min-h-28'}`}
        >
          {label && (
            <Text
              ml="2"
              my="1"
              className="inline-block select-none  text-[11px] font-medium text-gray-9"
            >
              {label}
            </Text>
          )}
          {loading && <LoadingPlaceholder className="mt-5" />}

          {!loading && options?.length === 0 && (
            <Text className="text-center text-1 font-medium">
              No Data Found
            </Text>
          )}
          <ScrollArea className="h-auto max-h-32 w-full px-2">
            {options?.length !== 0 &&
              !loading &&
              options?.map((option, index) => (
                <Box
                  className={`${
                    allowMultiple &&
                    selectedOptions.includes(option) &&
                    'pointer-events-none opacity-40'
                  }`}
                  key={`${option.label}-${index}`}
                >
                  <RowOption
                    onOptionClick={onOptionClick}
                    option={option}
                    disabledOptions={disabledOptions}
                  />
                </Box>
              ))}
          </ScrollArea>
        </Box>
      )}
    </Box>
  )
}

export { AsyncRowSelect }
