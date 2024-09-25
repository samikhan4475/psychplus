'use client'

import { Switch } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { DummyRelationship } from '../relationship-table'

const RRICell = ({
  row: {
    original: { isRri },
  },
}: PropsWithRow<DummyRelationship>) => {
  return <Switch defaultChecked={isRri} size="1" color="green" />
}

export { RRICell }
