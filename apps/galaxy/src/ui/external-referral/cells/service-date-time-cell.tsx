'use client'

import { Flex, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { getSlashedPaddedDateString, getTimeLabel } from '@/utils'
import { Patient } from '../types'

const ServiceDateTimeCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const requestedTime = patient.requestedTime
  return (
    <Flex justify="between" minWidth="130px" gap="2" className="!truncate">
      <Text className="text-pp-black-3" weight="regular" size="1">
        {getSlashedPaddedDateString(requestedTime)}
      </Text>
      <Text className="text-pp-black-3" weight="regular" size="1">
        {requestedTime && getTimeLabel(requestedTime)}
      </Text>
    </Flex>
  )
}

export { ServiceDateTimeCell }
