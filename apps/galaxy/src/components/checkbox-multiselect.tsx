'use client'

import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Checkbox,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { FormFieldContainer } from './form'

interface MultiSelectOption {
  value: string
  label: string
}

const Tag = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      className="bg-pp-table-border z-[1] h-4 w-full gap-1 rounded-3 px-1 pr-4 text-[10px]"
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
  options: MultiSelectOption[] | []
  placeholder?: string
  defaultValues?: string[]
  onChange?: (selectedValues: string[]) => void
  menuClassName?: string
  label?: string
  className?: string
  disabled?: boolean
}

const MultiSelectField = ({
  options,
  placeholder = 'Select',
  onChange,
  menuClassName,
  defaultValues,
  label,
  className,
  disabled = false,
}: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    defaultValues ?? [],
  )

  const form = useFormContext()
  const {
    formState: { disabled: formDisable, isSubmitting },
  } = form

  const disable = formDisable || isSubmitting || disabled

  const ref = useRef<HTMLButtonElement>(null)

  const handleChange = (value: string) => {
    const isSelected = selectedValues.includes(value)
    const tempSelectedValues = isSelected
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    setSelectedValues(tempSelectedValues)

    onChange?.(tempSelectedValues)
  }

  useEffect(() => {
    setSelectedValues(defaultValues ?? [])
  }, [defaultValues])

  const onClose = () => {
    setSelectedValues([])
    onChange?.([])
  }

  return (
    <FormFieldContainer className={cn('overflow-hidden', className)}>
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
          <DropdownMenu.Trigger
            disabled={disable}
            className={cn({
              'cursor-not-allowed': disable,
            })}
            ref={ref}
          >
            <Button
              color="gray"
              variant="outline"
              className={cn(
                'text-black !bg-white border-pp-gray-2 relative flex h-6 w-full cursor-default items-center !justify-between border border-solid px-1.5 pr-5 [box-shadow:none]',
                {
                  '!bg-pp-states-disabled': disable,
                },
              )}
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
                className={cn('absolute right-[3px] top-0 h-full', {
                  'pointer-events-none': disable,
                })}
              />
            </Button>
          </DropdownMenu.Trigger>
        </Box>
        <DropdownMenu.Content
          className={cn(
            `w-full min-w-[100px] rounded-1 shadow-3 [&__.rt-BaseMenuViewport]:p-2`,
            menuClassName,
          )}
          style={{
            minWidth: ref?.current?.clientWidth,
          }}
          align="start"
        >
          {!options?.length ? (
            <DropdownMenu.Item
              className="bg-white h-6 justify-center p-0 text-center text-1"
              onSelect={(e) => e.preventDefault()}
              disabled
            >
              No data
            </DropdownMenu.Item>
          ) : (
            options?.map((item) => (
              <DropdownMenu.Item
                className={cn('bg-white h-6 p-0', {
                  'bg-red-1': selectedValues.includes(item.value),
                })}
                key={item.value}
                onSelect={(e) => e.preventDefault()}
              >
                <Text
                  as="label"
                  size="1"
                  className="text-black w-full cursor-pointer gap-x-2 p-0 text-[14px]"
                >
                  <Flex gap="2" align="center" height="100%">
                    <Checkbox
                      color="indigo"
                      size="2"
                      highContrast
                      checked={selectedValues.includes(item.value)}
                      onCheckedChange={() => handleChange(item.value)}
                      key={item.value}
                    />
                    {item.label}
                  </Flex>
                </Text>
              </DropdownMenu.Item>
            ))
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </FormFieldContainer>
  )
}

export { MultiSelectField, type MultiSelectOption }
