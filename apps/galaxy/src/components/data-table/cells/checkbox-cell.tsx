import { Checkbox, Flex, Text } from '@radix-ui/themes'

interface CheckboxCellProps {
  label?: string
  checked: boolean
  className?: string
  onCheckedChange: (checked: boolean) => void
}

const CheckboxCell = ({
  label,
  checked,
  className,
  onCheckedChange,
}: CheckboxCellProps) => {
  return (
    <Flex height="100%" align="center" px="1" className={className}>
      <Checkbox
        size="1"
        checked={checked}
        onCheckedChange={onCheckedChange}
        highContrast
      />
      {label && (
        <Text size="1" ml="1">
          {label}
        </Text>
      )}
    </Flex>
  )
}

export { CheckboxCell }
