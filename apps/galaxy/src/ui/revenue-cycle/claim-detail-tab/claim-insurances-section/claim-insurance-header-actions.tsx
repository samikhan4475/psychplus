import { Flex, Switch, Text } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'

const ClaimInsuranceHeaders = () => {
  const form = useFormContext()
  const isSelfPay =
    useWatch({
      control: form.control,
      name: `isSelfPay`,
    }) ?? false
  return (
    <Flex gap="3" align="center" justify="end">
      <Text className="text-[11.5px] font-[600]">
        <Flex gap="2">
          <Switch
            checked={isSelfPay ?? false}
            size="1"
            onClick={(e) => {
              e.stopPropagation()
              form.setValue('isSelfPay', !isSelfPay)
            }}
          />
          Self Pay
        </Flex>
      </Text>
    </Flex>
  )
}

export { ClaimInsuranceHeaders }
