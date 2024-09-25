'use client'

import { Switch } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { DummyRelationship } from '../relationship-table'

const GuardianCell = ({
  row: {
    original: { isGuardian },
  },
}: PropsWithRow<DummyRelationship>) => {
  return <Switch defaultChecked={isGuardian} size="1" color="green" />
}

export { GuardianCell }
