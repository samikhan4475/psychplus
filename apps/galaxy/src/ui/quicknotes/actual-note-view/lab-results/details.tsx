import { Flex, Text } from '@radix-ui/themes'
import { LabResult } from '@/types'
import { formatUTCDate } from '@/utils'
import { BlockContainer } from '../shared'

const Details = ({ data }: { data: LabResult[] }) => {
  return (
    <BlockContainer heading="Lab Results">
      {data?.map((item) => (
        <Flex direction="row" align="center" gap="1" key={item?.resultId}>
          <Text size="1" weight="regular" wrap="nowrap">
            {`${item?.resultName ?? ''} |`}
          </Text>
          {item?.observationTime && (
            <Text size="1" weight="regular" wrap="nowrap">
              {`${formatUTCDate(
                item?.observationTime.toString(),
                'MM/dd/yy HH:mm',
              )} | `}
            </Text>
          )}
          <Text size="1" weight="regular" wrap="nowrap">
            {`${item?.labName} | `}
          </Text>
          <Text size="1" weight="regular" wrap="nowrap">
            {`${item?.resultValue} ${item?.resultUnit} | `}
          </Text>
          <Text size="1" weight="regular" wrap="nowrap">
            {`${item?.recomendedValue} ${item?.resultUnit}`}
          </Text>
        </Flex>
      ))}
    </BlockContainer>
  )
}

export { Details }
