import { Checkbox, Flex, Text } from '@radix-ui/themes'

interface CheckboxLabelProps {
  label: string
}
const CheckboxLabel = ({ label }: CheckboxLabelProps) => {
  return (
    <Text className="text-[11.5px] font-[600]">
      <Flex gap="2">
        <Checkbox
          checked={false}
          onCheckedChange={() => {}}
          highContrast
          className="cursor-pointer"
        />
        {label}
      </Flex>
    </Text>
  )
}

export { CheckboxLabel }
