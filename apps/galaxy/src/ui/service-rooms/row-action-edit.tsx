'use client'

import { type PropsWithRow } from '@/components'
import { AddNewRoomDialog } from './add-new-room-dialog'
import { ServiceRoom } from './types'

const RowActionEdit = ({
  row: { original: serviceRoom },
}: PropsWithRow<ServiceRoom>) => <AddNewRoomDialog data={serviceRoom} />

export { RowActionEdit }
