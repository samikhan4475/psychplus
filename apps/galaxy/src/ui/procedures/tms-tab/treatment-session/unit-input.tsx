import { Flex, Text } from '@radix-ui/themes'
import { FormFieldError, NumberInput } from '@/components'

interface UnitInputProps {
  field: string
  symbol: string
  disabled?: boolean
  label?: string
}

const UnitInput = ({
  field,
  symbol,
  disabled = false,
  label,
}: UnitInputProps) => {
  return (
    <Flex direction="row" gap="1" align="center">
      {label && (
        <Text size="1" weight="regular">
          {label}
        </Text>
      )}
      <Flex
        direction="row"
        className="border-pp-grey bg-pp-bg-table-cell h-6 w-[87px] justify-center rounded-2 border border-solid"
      >
        <NumberInput
          format="###"
          field={field}
          disabled={disabled}
          placeholder="000"
        />
        <Text className="text-pp-gray-3 w-[100%] text-center text-2 font-regular">
          {symbol}
        </Text>
      </Flex>
      <FormFieldError name={field} />
    </Flex>
  )
}

export { UnitInput }
