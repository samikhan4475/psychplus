'use client'

import { Switch } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/ui/patient-info/patient-info-tab/types'

const GuardianCell = ({
  row: {
    original: { isGuardian },
  },
}: PropsWithRow<Relationship>) => {
  return <Switch defaultChecked={isGuardian} size="1" color="green" />
}

export { GuardianCell }
