import { Flex, Switch, Text } from '@radix-ui/themes'

const ClaimInsuranceHeaders = () => {
  return (
    <Flex gap="3" align="center" justify="end">
      <Text className="text-[11.5px] font-[600]">
        <Flex gap="2">
          <Switch
            checked={false}
            size="1"
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
          Self Pay
        </Flex>
      </Text>
    </Flex>
  )
}

export { ClaimInsuranceHeaders }
