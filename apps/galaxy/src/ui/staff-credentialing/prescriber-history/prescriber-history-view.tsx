'use client'

import { PropsWithChildren, useState } from 'react'
import { Popover, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '../permission-alert'
import { PrescriberDataResponse } from '../types'
import { PrescriberHistoryTable } from './components/prescriber-history-table'

const PrescriberHistoryPopover = ({
  row,
  children,
}: PropsWithChildren<PropsWithRow<PrescriberDataResponse>>) => {
  const viewHistoryPermission = useHasPermission(
    'canClickPrescriberHistoryIconFromAdminNonAdminView',
  )
  
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenPermissionAlert, setIsOpenPermissionAlert] = useState(false)
  const onOpen = (value: boolean) => {
    if (!viewHistoryPermission) setIsOpenPermissionAlert(true)
    else {
      setIsOpen(value)
    }
  }

  return (
    <>
      <PermissionAlert
        isOpen={isOpenPermissionAlert}
        message={
          'You do not have permission to view Prescriber History. Please contact your supervisor if you need any further assistance.'
        }
        onClose={() => setIsOpenPermissionAlert(false)}
      />
      <Popover.Root open={isOpen} onOpenChange={onOpen}>
        <Popover.Trigger>{children}</Popover.Trigger>
        <Popover.Content className="z-10 flex-col p-1">
          <Text size="3" weight="medium">
            Prescriber settings history 
          </Text>
          <PrescriberHistoryTable row={row} />
        </Popover.Content>
      </Popover.Root>
    </>
  )
}

export { PrescriberHistoryPopover }