import React, { useEffect, useRef, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'
import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { FormFieldLabel } from '@psychplus/ui/form'

interface TagProps {
  onClose: () => void
}

interface OptionsType {
  label: string
  value: string
}

interface MutliSelectProps {
  options: OptionsType[]
  label?: string
  buttonClassName?: string
  onValueChange?: (val: string[]) => void
  defaultValues?: string[]
  disabled?: boolean
  height?: number
  showCode?: boolean
}

const Tags = ({ onClose, children }: React.PropsWithChildren<TagProps>) => {
  return (
    <Flex
      className="h-5 gap-1 bg-[#CAD8FD] px-2 text-[12px] font-bold [border-radius:12px]"
      align="center"
    >
      {children}
      <Cross2Icon className="cursor-pointer" onClick={onClose} />
    </Flex>
  )
}

const getDisplayLabel = (
  selectedValue: string,
  options: OptionsType[],
  showCode: boolean | undefined,
) => {
  const option = options?.find((op) => op?.value === selectedValue)
  if (showCode) return option?.value ?? ''
  else return option?.label ?? ''
}

const MultiSelectDropdown = ({
  options,
  label,
  buttonClassName,
  disabled = false,
  onValueChange,
  defaultValues,
  height = 28,
  showCode,
}: MutliSelectProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultValues ?? [],
  )
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (onValueChange) {
      onValueChange(selectedTags)
    }
  }, [selectedTags, onValueChange])

  const filteredOptions = options
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : []

  const onOptionSelect = (
    isChecked: boolean | string,
    selectedOption: string,
  ) => {
    const isSelected = selectedTags.includes(selectedOption)
    setSelectedTags((prevTags) =>
      isSelected
        ? prevTags.filter((v) => v !== selectedOption)
        : [...prevTags, selectedOption],
    )
  }

  const onOpen = (open: boolean) => {
    if (open) {
      inputRef.current?.focus()
    }
  }

  const deleteTag = (name: string) => {
    setSelectedTags((prevTags) => [...prevTags.filter((tag) => tag !== name)])
  }

  return (
    <Popover.Root onOpenChange={(open) => onOpen(open)} modal>
      {label && <FormFieldLabel>{label}</FormFieldLabel>}
      <Popover.Anchor className="mb-[3px]" />
      <Flex
        align="center"
        className="mb-1.5 box-border w-[100%] min-w-[200px] flex-wrap gap-1 border border-[#01062F38] px-1 [border-radius:4px]"
      >
        {selectedTags.map((tag) => (
          <Tags
            key={tag}
            onClose={() => {
              if (disabled) return
              deleteTag(tag)
            }}
          >
            {getDisplayLabel(tag, options, showCode)}
          </Tags>
        ))}
        <Popover.Trigger asChild>
          <Flex
            className={`flex-1 border-none bg-[#FFFF] ${
              buttonClassName ?? ''
            } h-[calc(${height}px-1.6px)]`}
            onClick={() => {
              inputRef.current?.focus()
            }}
          >
            <input
              placeholder="Search by keyword"
              disabled={disabled}
              value={searchValue}
              className={`${
                disabled ? 'cursor-not-allowed' : ''
              } w-[100%] min-w-[100px] border-transparent text-[12px] outline-none [border-radius:4px]`}
              ref={inputRef}
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
          </Flex>
        </Popover.Trigger>
      </Flex>
      <Popover.Content
        align="start"
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Flex
          direction="column"
          className="max-h-[300px] min-w-[486px] overflow-y-scroll bg-[#FFF] px-3"
        >
          {(searchValue ? filteredOptions : options).map((option) => (
            <Text as="label" key={option.value}>
              <Flex
                align="center"
                gap="2"
                className={`${
                  selectedTags.find((tag) => tag === option.value)
                    ? 'bg-[#f2f2f5]'
                    : 'bg-[#FFFF]'
                } px-3 py-2 [border-radius:4px]`}
              >
                <Checkbox
                  color="indigo"
                  checked={selectedTags.includes(option.value)}
                  highContrast
                  onCheckedChange={(e) => onOptionSelect(e, option.value)}
                />
                {option.label}
              </Flex>
            </Text>
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export { MultiSelectDropdown }
