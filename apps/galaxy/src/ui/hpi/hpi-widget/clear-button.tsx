'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { getInitialValues } from './utils'

const DEFAULT_ALERT_MESSAGE =
  'You do not have permission to Clear. Please contact your supervisor if you need any further assistance.'

const ClearButton = ({
  alertMessage,
  shouldCheckPermission,
}: {
  alertMessage?: string
  shouldCheckPermission?: boolean
}) => {
  const form = useFormContext()
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
            form?.reset(getInitialValues())
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

export { ClearButton }
