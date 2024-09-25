'use client'

import { Switch } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/ui/patient-info/patient-info-tab/types'

const RRICell = ({
  row: {
    original: { isRri },
  },
}: PropsWithRow<Relationship>) => {
  return <Switch defaultChecked={isRri} size="1" color="green" />
}

export { RRICell }
