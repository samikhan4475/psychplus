'use client'

import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { Button, Dialog } from '@radix-ui/themes'
import { CreditCardIcon } from 'lucide-react'
import { useState } from 'react'

const PaymentButton = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const hasPermission = useHasPermission('addPaymentCard')

  const handleClick = () => {
    if (!hasPermission) {
      setIsAlertOpen(true)
    }
  }
  return (
    <>
      {
        !hasPermission ? (
          <Button size="1" highContrast onClick={handleClick}>
            <CreditCardIcon width={12} height={12} />
            Payment
          </Button>
        ) : (
          <Dialog.Trigger>
            <Button size="1" highContrast>
              <CreditCardIcon width={12} height={12} />
              Payment
            </Button>
          </Dialog.Trigger>
        )}
      <PermissionAlert
        isOpen={isAlertOpen}
        message="You do not have permission to Payment. Please contact your supervisor if you need further assistance."
        onClose={() => setIsAlertOpen(false)}
      />
    </>
  )
}

export { PaymentButton }
