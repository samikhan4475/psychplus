'use client'

import React from 'react'
import { PropsWithRow } from '@/components'
import { EditUnderlinedIcon } from '@/components/icons'
import { Service } from '@/types'
import { AddLocationServiceDialog } from './add-service-dialog'
import { useStore } from './store'

interface EditServiceButtonProps extends PropsWithRow<Service> {
  googleApiKey: string
}
const EditServiceButton = ({ row, googleApiKey }: EditServiceButtonProps) => {
  const refetch = useStore((state) => state.refetch)
  return (
    <AddLocationServiceDialog
      service={row.original}
      googleApiKey={googleApiKey}
      title="Edit Service"
      onDone={refetch}
    >
      <EditUnderlinedIcon />
    </AddLocationServiceDialog>
  )
}

export { EditServiceButton }
