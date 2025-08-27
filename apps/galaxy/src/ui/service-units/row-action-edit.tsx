'use client'

import { type PropsWithRow } from '@/components'
import { AddNewUnitDialog } from './add-new-unit-dialog'
import { ServiceUnit } from './types'

const RowActionEdit = ({
  row: { original: serviceGroup },
}: PropsWithRow<ServiceUnit>) => <AddNewUnitDialog data={serviceGroup} />

export { RowActionEdit }
