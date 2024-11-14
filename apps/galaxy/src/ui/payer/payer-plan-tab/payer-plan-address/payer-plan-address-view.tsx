import { Flex, Text } from '@radix-ui/themes'
import { PayerPlanAddressDialog } from './payer-plan-address-dialog'
import { PayerPlanAddressTable } from './payer-plan-address-table'

const PayerPlanAddressView = () => {
  return (
    <>
      <Flex
        align="center"
        justify="between"
        p="2"
        className="bg-white -mt-[1px]"
      >
        <Text className="text-[16px] font-[600] text-accent-12">
          Payer Plan Address
        </Text>
        <PayerPlanAddressDialog isEditMode={false} data={null} />
      </Flex>
      <Flex
        direction="column"
        gap="1"
        className="bg-white w-full px-2 pb-2 pt-1"
      >
        <PayerPlanAddressTable />
      </Flex>
    </>
  )
}

export { PayerPlanAddressView }
