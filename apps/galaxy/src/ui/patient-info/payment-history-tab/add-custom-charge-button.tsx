'use client'

import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { Button, Dialog } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const AddCustomChargeButton = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const hasPermission = useHasPermission('addCustomCharge')

  const handleClick = () => {
    if (!hasPermission) {
      setIsAlertOpen(true)
    }
  }
  return (
    <>
      {
        !hasPermission ? (
          <Button size="1" variant="outline" color="gray" className="text-black" onClick={handleClick}>
            <Plus width={12} height={12} />
            Add Custom Charge
          </Button>
        ) : (
          <Dialog.Trigger>
            <Button size="1" variant="outline" color="gray" className="text-black" onClick={handleClick}>
              <Plus width={12} height={12} />
              Add Custom Charge
            </Button>
          </Dialog.Trigger>
        )
      }
      <PermissionAlert
        isOpen={isAlertOpen}
        message="You do not have permission to Add Custom Charge. Please contact your supervisor if you need further assistance."
        onClose={() => setIsAlertOpen(false)}
      />
    </>
  )
}

export { AddCustomChargeButton }
