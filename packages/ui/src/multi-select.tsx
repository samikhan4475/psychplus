import { PropsWithChildren, useEffect, useState } from 'react'
import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { cn } from './cn'

interface MultiSelectOption {
  value: string
  label: string
}

interface TagProps {
  onClose: () => void
}

const Tag = ({ onClose, children }: PropsWithChildren<TagProps>) => {
  return (
    <Flex
      className="z-20 ml-0.5 h-4 flex-1 gap-1 bg-[#CAD8FD] px-1 text-[10px] [border-radius:12px]"
      justify="between"
      align="center"
    >
      {children}
      <Cross2Icon
        width={12}
        height={12}
        className="cursor-pointer"
        onClick={onClose}
      />
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
  width?: string
  label?: string
}

const MultiSelectField: React.FC<Props> = ({
  options,
  placeholder = 'Select',
  onChange,
  width,
  defaultValues,
  label,
}) => {
  const ddMenuContentClasses = `max-h-[300px] 'w-[${width ? width : '200px'}]}`
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
    <Flex direction="column" gap="1">
      {label && (
        <Text as="label" size="2" weight="bold">
          {label}
        </Text>
      )}
      <DropdownMenu.Root>
        <Button
          variant="outline"
          className="z-10 flex h-6 items-center px-1.5 text-[#000000] [box-shadow:inset_0_0_0.4px_1px_#DDDDE3]"
        >
          {selectedValues.length < 1 ? (
            <span>{placeholder}</span>
          ) : (
            <Tag onClose={onClose}>
              {getDisplayLabel(selectedValues, options)}
            </Tag>
          )}
          <DropdownMenu.Trigger className="min-w-[16px]">
            <ChevronDownIcon width={16} height={16} />
          </DropdownMenu.Trigger>
        </Button>
        <DropdownMenu.Content className={ddMenuContentClasses}>
          {options.map((item) => (
            <DropdownMenu.Item
              className={cn('gap-x-2 bg-[#FFF] px-1 py-2 text-[#000000]', {
                'bg-[#f2f2f5]': selectedValues.find((v) => v === item.value),
              })}
              key={item.value}
              onSelect={(e) => e.preventDefault()}
            >
              <Checkbox
                color="indigo"
                highContrast
                checked={selectedValues.includes(item.value)}
                onCheckedChange={() => handleChange(item.value)}
                key={item.value}
              />{' '}
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}

export { MultiSelectField, type MultiSelectOption }
