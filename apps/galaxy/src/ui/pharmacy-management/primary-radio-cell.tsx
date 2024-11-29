'use client'

import { Radio } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Pharmacy } from './types'

const PrimaryRadioCell = ({
  row: {
    original: { isPreferred },
  },
}: PropsWithRow<Pharmacy>) => {
  return <Radio value="true" checked={isPreferred} highContrast size="1" />
}

export { PrimaryRadioCell }
