'use client'

import { Flex, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { getSlashedPaddedDateString, getTimeLabel } from '@/utils'
import { Patient } from '../types'

const UpdatedDateTimeCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const updatedAt = patient.metadata?.createdOn
  return (
    <Flex justify="between" minWidth="130px" gap="2" className="!truncate">
      <Text className="text-pp-black-3" weight="regular" size="1">
        {getSlashedPaddedDateString(updatedAt)}
      </Text>
      <Text className="text-pp-black-3" weight="regular" size="1">
        {updatedAt && getTimeLabel(updatedAt)}
      </Text>
    </Flex>
  )
}

export { UpdatedDateTimeCell }
