import React, { useRef, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Checkbox, Flex, Popover } from '@radix-ui/themes'
import { FormFieldLabel } from '@psychplus/ui/form'

interface TagProps {
  onClose: () => void
}

interface OptionsType {
  label: string
  value: string
}

const Tags = ({ onClose, children }: React.PropsWithChildren<TagProps>) => {
  return (
    <Flex
      className="gap-1 bg-[#CAD8FD] px-2 text-[12px] font-bold [border-radius:12px]"
      align="center"
    >
      {children}
      <Cross2Icon className="cursor-pointer" onClick={onClose} />
    </Flex>
  )
}

const MultiSelectDropdown = ({
  options,
  label,
  disabled = false,
}: {
  options: OptionsType[]
  label?: string
  disabled?: boolean
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<OptionsType[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const filteredOptions = options
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : []

  const onOptionSelect = (
    isChecked: boolean | string,
    selectedOption: string,
  ) => {
    if (isChecked && options)
      setSelectedTags((prevTags) => [
        ...prevTags,
        ...options.filter((option) => option.label === selectedOption),
      ])
    else if (!isChecked)
      setSelectedTags((prevTags) => [
        ...prevTags.filter((tag) => tag.label !== selectedOption),
      ])
  }

  const onOpen = (open: boolean) => {
    if (open) {
      inputRef.current?.focus()
    }
  }

  const deleteTag = (name: string) => {
    setSelectedTags((prevTags) => [
      ...prevTags.filter((tag) => tag.label !== name),
    ])
  }

  return (
    <Popover.Root onOpenChange={(open) => onOpen(open)}>
      <Flex direction="column" gap="1">
        {label && <FormFieldLabel>{label}</FormFieldLabel>}
        <Flex className="w-[100%] min-w-[200px] flex-wrap gap-1 border border-[#01062F38] p-1 [border-radius:4px]">
          {selectedTags.map((tag) => (
            <Tags key="tag" onClose={() => deleteTag(tag.label)}>
              {tag.label}
            </Tags>
          ))}
          <Popover.Trigger type="button">
            <button
              className={`${
                disabled ? 'cursor-not-allowed' : ''
              } flex-1 border-none bg-[#FFFF]`}
              type="button"
              disabled={disabled}
              onClick={() => {
                inputRef.current?.focus()
              }}
            >
              <input
                placeholder="Search by keyword"
                value={searchValue}
                disabled={disabled}
                className={`${
                  disabled ? 'cursor-not-allowed' : ''
                } w-[100%] min-w-[100px] border-none border-transparent text-[12px] outline-none`}
                ref={inputRef}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                }}
              />
            </button>
          </Popover.Trigger>
        </Flex>
      </Flex>
      <Popover.Content
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Flex direction="column" className="max-h-[300px] min-w-[486px]">
          {(searchValue ? filteredOptions : options).map((option) => (
            <Flex
              key="option"
              align="center"
              gap="2"
              className={`${
                selectedTags.find((tag) => tag.label === option.label)
                  ? 'bg-[#00003B0D]'
                  : 'bg-[#FFFF]'
              } px-3 py-2 [border-radius:4px]`}
            >
              <Checkbox
                color="indigo"
                highContrast
                checked={selectedTags.includes(option)}
                onCheckedChange={(e) => onOptionSelect(e, option.label)}
              />
              {option.label}
            </Flex>
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export { MultiSelectDropdown }
