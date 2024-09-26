'use client'

import { PropsWithRow } from '@/components'
import { CloseIcon, TickIcon } from '@/components/icons'
import { BillingHistory } from '../types'

const SignCell = ({
  row: {
    original: { isSigned },
  },
}: PropsWithRow<BillingHistory>) => {
  return isSigned ? <TickIcon /> : <CloseIcon />
}

export { SignCell }
