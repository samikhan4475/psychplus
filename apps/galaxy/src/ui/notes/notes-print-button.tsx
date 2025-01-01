'use client'

import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { handlePrint } from '@/utils'
import { useStore } from './store'

interface NotesPrintButtonProps {
  id: string
}

const NotesPrintButton = ({ id }: NotesPrintButtonProps) => {
  const { setIsErrorAlertOpen, setErrorMessage } = useStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
  }))

  const printButtonPermission = useHasPermission(
    'printButtonVisitViewQuickNote',
  )

  const onClick = () => {
    if (!printButtonPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to Print Note. Please contact your supervisor if you need any further assistance.',
      )
      return
    }
    handlePrint(id)
  }
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      onClick={onClick}
    >
      <PrinterIcon height={14} width={14} strokeWidth={1.5} />
    </Button>
  )
}

export { NotesPrintButton }
