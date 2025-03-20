import { Flex, Text } from '@radix-ui/themes'
import { LabOrders } from '@/types'
import { LabOrderStatusEnum } from '@/ui/lab-orders/add-lab-order/blocks/types'
import { formatUTCDate } from '@/utils'
import { BlockContainer } from '../shared'

const Details = ({ data }: { data: LabOrders[] }) => {
  const labOrdersExceptUnsigned = data?.filter(
    (item) => item?.orderStatus !== LabOrderStatusEnum.Unsigned,
  )

  return (
    labOrdersExceptUnsigned?.length > 0 && (
      <BlockContainer heading="Lab Orders">
        {labOrdersExceptUnsigned?.map((item) => (
          <Flex direction="row" align="center" gap="1" key={item?.id}>
            <Text size="1" weight="regular" wrap="nowrap">
              {`${formatUTCDate(item?.labOrderDate, 'MM/dd/yy')} | `}
            </Text>
            <Text size="1" weight="regular" wrap="nowrap">
              {`${item?.orderingStaffName?.firstName ?? ''} ${
                item?.orderingStaffName?.lastName ?? ''
              } |`}
            </Text>
            <Text size="1" weight="regular" wrap="nowrap">
              {` ${
                item?.labTests &&
                item?.labTests
                  .filter((labTest) => labTest.recordStatus === 'Active')
                  .map((labTestActive) => labTestActive.testName)
                  .join(', ')
              }`}
            </Text>
            <Text size="1" weight="regular" wrap="nowrap">
              {` | ${item?.orderingLab?.name}`}
            </Text>
          </Flex>
        ))}
      </BlockContainer>
    )
  )
}

export { Details }
