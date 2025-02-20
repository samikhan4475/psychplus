import { Flex, Text } from '@radix-ui/themes'
import { PayerPlanAddressDialog } from './payer-plan-address-dialog'
import { PayerPlanAddressTable } from './payer-plan-address-table'

interface PayerPlanAddressProps {
  payerId: string | undefined
}
const PayerPlanAddressView = ({ payerId }: PayerPlanAddressProps) => {
  return (
    <>
      <Flex
        align="center"
        justify="start"
        p="2"
        className="bg-white -mt-[1px]"
      >
        <Text className="text-[16px] font-[600] text-accent-12 mr-3">
          Payer Plan Address
        </Text>
        <PayerPlanAddressDialog
          isEditMode={false}
          data={null}
          payerId={payerId ?? ''}
        />
      </Flex>
      <Flex
        direction="column"
        gap="1"
        className="bg-white w-full px-2 pb-2 pt-1"
      >
        <PayerPlanAddressTable payerId={payerId} />
      </Flex>
    </>
  )
}

export { PayerPlanAddressView }
