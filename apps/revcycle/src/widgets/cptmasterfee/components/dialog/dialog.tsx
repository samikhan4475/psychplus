import { useEffect, useState } from 'react'
import { Dialog } from '@psychplus/ui/dialog'
import { CPTComponent } from './cpt'

interface CPT {
  macLocality?: string
  hcpcsCodes?: string[]
  cptCode?: string
  placeOfService?: string
  description?: string
  category?: string
  requirement?: string
  gender?: string
  minimumAge?: string
  maximumAge?: string
  resourceStatusList?: string
  id?: string
}

const AddDialog = (props: {
  open: boolean
  setDialogOpen: (flg: boolean) => void
  refresh: () => void
  optionalData: CPT
}) => (
  <Dialog.Root open={props.open} onOpenChange={props.setDialogOpen}>
    <Dialog.Content className="z-100 max-w-[600px]">
      <Dialog.Title>Add CPT</Dialog.Title>
      <CPTComponent
        refresh={() => {
          props.setDialogOpen(false)
          props.refresh()
        }}
        optionalData={props.optionalData}
      />
    </Dialog.Content>
  </Dialog.Root>
)

export { AddDialog }
