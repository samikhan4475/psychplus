'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { FieldValues, useFormContext } from 'react-hook-form'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'

interface WidgetClearButtonProps<T extends FieldValues> {
  defaultInitialValues?: T
  alertMessage?: string
  shouldCheckPermission?: boolean
  onClear?: () => void
}
const DEFAULT_ALERT_MESSAGE =
  'You do not have permission to Clear. Please contact your supervisor if you need any further assistance.'

const WidgetClearButton = <T extends FieldValues>({
  defaultInitialValues,
  alertMessage,
  shouldCheckPermission,
  onClear,
}: WidgetClearButtonProps<T>) => {
  const form = useFormContext<T>()
  const permission = useHasPermission('clearSelectedOptionsVisitViewTabs')
  const [openAlert, setOpenAlert] = useState(false)
  return (
    <>
      <Button
        variant="outline"
        size="1"
        color="gray"
        className="text-black"
        onClick={(e) => {
          e.preventDefault()
          if (shouldCheckPermission && !permission) {
            setOpenAlert(true)
            return
          } else {
            onClear && onClear()
            form?.reset(defaultInitialValues)
          }
        }}
      >
        Clear
      </Button>
      <PermissionAlert
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        message={alertMessage ?? DEFAULT_ALERT_MESSAGE}
      />
    </>
  )
}

export { WidgetClearButton }
