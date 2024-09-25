'use client'

import { Switch } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/ui/patient-info/patient-info-tab/types'

const EmergencyContactCell = ({
  row: {
    original: { isEmergencyContact },
  },
}: PropsWithRow<Relationship>) => {
  return <Switch defaultChecked={isEmergencyContact} size="1" color="green" />
}

export { EmergencyContactCell }
