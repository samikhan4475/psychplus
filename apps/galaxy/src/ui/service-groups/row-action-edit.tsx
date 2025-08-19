'use client'

import { type PropsWithRow } from '@/components'
import { AddNewGroupDialog } from './add-new-group-dialog'
import { ServiceGroup } from './types'

const RowActionEdit = ({
  row: { original: serviceGroup },
}: PropsWithRow<ServiceGroup>) => <AddNewGroupDialog data={serviceGroup} />

export { RowActionEdit }
