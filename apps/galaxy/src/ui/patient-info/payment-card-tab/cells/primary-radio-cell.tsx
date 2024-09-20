'use client'

import { Flex, Radio } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CreditCard } from '../types'

const PrimaryRadioCell = ({ row }: PropsWithRow<CreditCard>) => {
  return (
    <Flex justify="start" px="1" align="center" width="100%" height="100%">
      <Radio
        value="isPrimary"
        checked={row?.original?.isPrimary}
        highContrast
        size="1"
      />
    </Flex>
  )
}

export { PrimaryRadioCell }
