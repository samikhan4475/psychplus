'use client'

import { Flex, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { getSlashedPaddedDateString, getTimeLabel } from '@/utils'
import { Patient } from '../types'

const HistoryDateTimeCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const createdOnDate = patient.metadata?.createdOn
  return (
    <Flex justify="between" minWidth="130px" gap="2" className="!truncate">
      <Text className="text-pp-black-3" weight="regular" size="1">
        {getSlashedPaddedDateString(createdOnDate)}
      </Text>
      <Text className="text-pp-black-3" weight="regular" size="1">
        {createdOnDate && getTimeLabel(createdOnDate)}
      </Text>
    </Flex>
  )
}

export { HistoryDateTimeCell }
