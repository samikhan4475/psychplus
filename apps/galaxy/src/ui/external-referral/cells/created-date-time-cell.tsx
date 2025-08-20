'use client'

import { Flex, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { formatDateTime } from '@/utils'
import { Patient } from '../types'

const CreatedDateTimeCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const createdTime = patient?.metadata?.createdOn
  if (!createdTime) return

  return (
    <Flex justify="between" minWidth="130px" className="!truncate">
      <Text className="text-pp-black-3" weight="regular" size="1">
        {formatDateTime(createdTime, false)}
      </Text>
    </Flex>
  )
}

export { CreatedDateTimeCell }
