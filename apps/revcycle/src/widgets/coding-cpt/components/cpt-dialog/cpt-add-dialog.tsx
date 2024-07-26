'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@psychplus/ui/dialog'
import { CPTAddForm } from './cpt-add-form'

interface CPT {
  macLocality?: string
  hcpcsCodes?: string
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

const CPTAddDialog = (props: {
  open: boolean
  setDialogOpen: (flg: boolean) => void
  refresh: () => void
  optionalData: CPT
}) => (
  <Dialog.Root open={props.open} onOpenChange={props.setDialogOpen}>
    <Dialog.Content className="relative max-w-[1000px] rounded-6 p-6 font-bold text-[#151B4A]">
      <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
        <Cross2Icon />
      </Dialog.Close>
      <Dialog.Title size="8">Add CPT</Dialog.Title>
      <CPTAddForm
        refresh={() => {
          props.setDialogOpen(false)
          props.refresh()
        }}
        optionalData={props.optionalData}
      />
    </Dialog.Content>
  </Dialog.Root>
)

export { CPTAddDialog }
