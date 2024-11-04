'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CloseIcon, TickIcon } from '@/components/icons'
import { BillingHistory } from '../types'

const SignCell = ({
  row: {
    original: { isSigned },
  },
}: PropsWithRow<BillingHistory>) => (
  <Flex justify="center" width="100%">
    {isSigned ? <TickIcon /> : <CloseIcon />}
  </Flex>
)

export { SignCell }
