import { Flex } from '@radix-ui/themes'
import { ColumnHeader, FormFieldError } from '@/components'

const PrimaryHeaderCell = () => {
  return (
    <Flex gap="1" align="center">
      <ColumnHeader label="Primary" />
      <FormFieldError name="cptPrimaryCodes" className="font-regular" />
    </Flex>
  )
}

export { PrimaryHeaderCell }
