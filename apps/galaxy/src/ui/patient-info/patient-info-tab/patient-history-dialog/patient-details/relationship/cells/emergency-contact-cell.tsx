'use client'

import { Switch } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { DummyRelationship } from '../relationship-table'

const EmergencyContactCell = ({
  row: {
    original: { isEmergencyContact },
  },
}: PropsWithRow<DummyRelationship>) => {
  return <Switch defaultChecked={isEmergencyContact} size="1" color="green" />
}

export { EmergencyContactCell }
