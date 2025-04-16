'use client'

import { Fragment, useState } from 'react'
import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { WarningAlertDialog } from '@/ui/alerts'
import { handlePrint } from '@/utils'

interface PrintButtonProps {
  id: string
}

const PrintButton = ({ id }: PrintButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const printButtonPermission = useHasPermission(
    'printButtonVisitViewQuickNote',
  )
  const onClick = () => {
    if (!printButtonPermission) {
      return setIsOpen(true)
    }
    handlePrint(id, 'Medication Details')
  }
  return (
    <Fragment>
      <Button
        variant="outline"
        color="gray"
        size="1"
        className="text-black"
        onClick={onClick}
      >
        <PrinterIcon height={14} width={14} strokeWidth={1.5} />
      </Button>
      <WarningAlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message="You do not have permission to Print Note. Please contact your supervisor if you need any further assistance."
      />
    </Fragment>
  )
}

export { PrintButton }
