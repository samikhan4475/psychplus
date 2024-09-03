'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Checkbox,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes'
import { cn } from '@/utils'
import { FormFieldContainer } from './form'

interface MultiSelectOption {
  value: string
  label: string
}

const Tag = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      className="bg-pp-table-border z-[1] h-4 w-full gap-1 rounded-3 px-1 text-[10px]"
      justify="between"
      align="center"
    >
      {children}
    </Flex>
  )
}

const getDisplayLabel = (
  selectedValues: string[],
  options: MultiSelectOption[],
) => {
  if (selectedValues.length === 1) {
    return (
      <span className="truncate">
        {options.find((option) => option.value === selectedValues[0])?.label ??
          ''}
      </span>
    )
  }

  return <span className="truncate">{`${selectedValues.length} items`}</span>
}

interface Props {
  options: MultiSelectOption[]
  placeholder?: string
  defaultValues?: string[]
  onChange?: (selectedValues: string[]) => void
  menuClassName?: string
  label?: string
}

const MultiSelectField: React.FC<Props> = ({
  options,
  placeholder = 'Select',
  onChange,
  menuClassName,
  defaultValues,
  label,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    defaultValues ?? [],
  )

  const handleChange = (value: string) => {
    const isSelected = selectedValues.includes(value)
    setSelectedValues((prevValues) =>
      isSelected
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value],
    )
  }

  const onClose = () => {
    setSelectedValues([])
  }

  useEffect(() => {
    if (onChange) {
      onChange(selectedValues)
    }
  }, [onChange, selectedValues])

  return (
    <FormFieldContainer>
      {label && (
        <Text as="label" size="1" weight="medium">
          {label}
        </Text>
      )}
      <DropdownMenu.Root>
        <Box className="relative">
          <Cross2Icon
            width={12}
            height={12}
            className={cn('absolute right-6 top-1.5 z-[2] cursor-pointer', {
              hidden: selectedValues.length < 1,
            })}
            onClick={onClose}
          />
          <DropdownMenu.Trigger>
            <Button
              color="gray"
              variant="outline"
              className="text-black !bg-white border-pp-gray-2 relative flex h-6 w-full cursor-default items-center !justify-between border border-solid px-1.5 pr-5 [box-shadow:none]"
            >
              {selectedValues.length < 1 ? (
                <Text
                  as="span"
                  className="text-[12px] font-regular text-grayA-10"
                >
                  {placeholder}
                </Text>
              ) : (
                <Tag>{getDisplayLabel(selectedValues, options)}</Tag>
              )}
              <ChevronDownIcon
                width={14}
                height={14}
                className="absolute right-[3px] top-0 h-full"
              />
            </Button>
          </DropdownMenu.Trigger>
        </Box>
        <DropdownMenu.Content
          className={cn(`w-full min-w-[100px]`, menuClassName)}
          align="start"
        >
          {options.map((item) => (
            <DropdownMenu.Item
              className={'bg-white p-0'}
              key={item.value}
              onSelect={(e) => e.preventDefault()}
            >
              <Text
                as="label"
                size={'1'}
                className="text-black hover:bg-pp-focus-bg h-full w-full cursor-pointer gap-x-2 rounded-1 py-0.5 pl-1.5 pr-1"
              >
                <Flex gap={'1'} align={'center'} height={'100%'}>
                  <Checkbox
                    color="indigo"
                    size={'1'}
                    highContrast
                    checked={selectedValues.includes(item.value)}
                    onCheckedChange={() => handleChange(item.value)}
                    key={item.value}
                  />
                  {item.label}
                </Flex>
              </Text>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </FormFieldContainer>
  )
}

export { MultiSelectField, type MultiSelectOption }
