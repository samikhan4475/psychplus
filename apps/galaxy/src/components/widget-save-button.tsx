'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'

const DEFAULT_ALERT_MESSAGE =
  'You do not have permission to Save. Please contact your supervisor if you need any further assistance.'

const WidgetSaveButton = ({
  alertMessage,
  shouldCheckPermission,
  variant = 'outline',
}: {
  alertMessage?: string
  shouldCheckPermission?: boolean
  variant?: 'outline' | 'filled'
}) => {
  const permission = useHasPermission('saveSelectedOptionsVisitViewTabs')
  const [openAlert, setOpenAlert] = useState(false)

  return (
    <>
      {variant === 'filled' ? (
        <Button
          type={shouldCheckPermission && !permission ? 'button' : 'submit'}
          size="1"
          highContrast
          onClick={() => {
            if (shouldCheckPermission && !permission) {
              setOpenAlert(true)
              return
            }
          }}
        >
          <SaveIcon width={15} height={15} strokeWidth={1.75} />
          Save
        </Button>
      ) : (
        <Button
          type={shouldCheckPermission && !permission ? 'button' : 'submit'}
          variant="outline"
          size="1"
          color="gray"
          className="text-black"
          onClick={() => {
            if (shouldCheckPermission && !permission) {
              setOpenAlert(true)
              return
            }
          }}
        >
          Save
        </Button>
      )}

      <PermissionAlert
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        message={alertMessage ?? DEFAULT_ALERT_MESSAGE}
      />
    </>
  )
}

export { WidgetSaveButton }
