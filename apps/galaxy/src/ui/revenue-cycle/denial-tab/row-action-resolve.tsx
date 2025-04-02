import React, { useState } from 'react'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { resolveDenialAction } from '../actions'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'
import { DenialServiceLine } from '../types'
import { useStore } from './store'

const RowActionResolve = ({
  row: { original },
}: PropsWithRow<DenialServiceLine>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isResolving, setIsResolving] = useState(false)
  const { payload, search } = useStore((state) => ({
    payload: state.payload,
    search: state.search,
  }))
  const onResolve = async () => {
    setIsResolving(true)
    toggleOpen()
    const result = await resolveDenialAction(original.claimServiceLinePaymentId)
    if (result.state === 'success') {
      toast.success('Denial resolved successfully')
    } else if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to resolve the denial')
    }
    setIsResolving(false)
    search(payload)
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <>
      <ConfirmationDialog
        closeDialog={toggleOpen}
        heading="Confirmation"
        content="Are you sure you want to resolve this denial?"
        isOpen={isOpen}
        onConfirmation={onResolve}
      />
      <Button
        disabled={original.isResolved || isResolving}
        loading={isResolving}
        highContrast
        size="1"
        className="disabled:pointer-events-none disabled:bg-gray-3 disabled:text-gray-11"
        type="button"
        onClick={toggleOpen}
      >
        Resolve
      </Button>
    </>
  )
}

export { RowActionResolve }
