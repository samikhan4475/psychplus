'use client'

import { useState } from 'react'
import {
  AlertDialog,
  Button,
  Flex,
  IconButton,
  Tooltip,
} from '@radix-ui/themes'
import { LinkIcon, Pencil, Power } from 'lucide-react'
import toast from 'react-hot-toast'
import { PreferredPartnerUser } from '@/types'
import { usePreferredPartnerStore } from '../store'
import { AddAccountLink } from './add-account-link'
import { EditUserDialog } from './edit-user-dialog'

interface ActionCellProps {
  original: PreferredPartnerUser
  context?: 'active' | 'worklist'
  googleApiKey?: string
}

const isDeleted = (user: PreferredPartnerUser) =>
  user.recordStatus === 'Deleted'

export const ActionCell = ({
  original,
  context = 'active',
  googleApiKey,
}: ActionCellProps) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const isRecordDeleted = isDeleted(original)

  const { activeUsersData, worklistData } = usePreferredPartnerStore(
    (state) => ({
      activeUsersData: state.activeUsersData,
      worklistData: state.worklistData,
    }),
  )

  const allUsers = context === 'active' ? activeUsersData : worklistData

  const handleDeactivateUser = async () => {
    const { partnerId } = original
    await toast.promise(
      usePreferredPartnerStore
        .getState()
        .deactivateUser(partnerId, original.id, context),
      {
        loading: 'Deactivating user...',
        success: 'User deactivated successfully',
        error: (err) => `Error: ${err.message ?? 'Failed to deactivate user'}`,
      },
    )
    setIsDeactivateDialogOpen(false)
  }

  const renderPowerButton = () => {
    if (isRecordDeleted) {
      return (
        <Tooltip content="Activate user">
          <IconButton
            size="2"
            type="button"
            variant="ghost"
            onClick={() => {
              const { partnerId } = original
              toast.promise(
                usePreferredPartnerStore
                  .getState()
                  .activateUser(partnerId, original.id, context),
                {
                  loading: 'Activating user...',
                  success: 'User activated successfully',
                  error: (err) =>
                    `Error: ${err.message ?? 'Failed to activate user'}`,
                },
              )
            }}
          >
            <Power size={16} color={'#22c55e'} />
          </IconButton>
        </Tooltip>
      )
    }

    if (original.recordStatus === 'Active') {
      return (
        <Tooltip content="Deactivate user">
          <IconButton
            size="2"
            type="button"
            variant="ghost"
            onClick={() => setIsDeactivateDialogOpen(true)}
          >
            <Power size={16} color={'#ef4444'} />
          </IconButton>
        </Tooltip>
      )
    }

    return (
      <Tooltip content="Activate user">
        <IconButton
          size="2"
          type="button"
          variant="ghost"
          onClick={() => {
            const { partnerId } = original
            toast.promise(
              usePreferredPartnerStore
                .getState()
                .activateUser(partnerId, original.id, context),
              {
                loading: 'Activating user...',
                success: 'User activated successfully',
                error: (err) =>
                  `Error: ${err.message ?? 'Failed to activate user'}`,
              },
            )
          }}
        >
          <Power size={16} color={'#22c55e'} />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Flex gap="2" align="center" justify="end">
      {renderPowerButton()}
      {!isRecordDeleted && original.userStatus === 'Primary' && (
        <Tooltip content="Edit user">
          <IconButton
            size="2"
            type="button"
            variant="ghost"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil size={16} color={'#60646C'} />
          </IconButton>
        </Tooltip>
      )}
      {!isRecordDeleted && original.matchStatus === 'Reconcile' && (
        <>
          <Tooltip content="Link to patient">
            <IconButton
              size="2"
              type="button"
              variant="ghost"
              onClick={() => setIsLinkDialogOpen(true)}
            >
              <LinkIcon size={16} color={'#60646C'} />
            </IconButton>
          </Tooltip>
          <AddAccountLink
            open={isLinkDialogOpen}
            onOpenChange={setIsLinkDialogOpen}
            preferredPartnerUser={original}
            context={context}
          />
        </>
      )}

      <EditUserDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={original}
        allUsers={allUsers}
        context={context}
        googleApiKey={googleApiKey || ''}
      />

      <AlertDialog.Root
        open={isDeactivateDialogOpen}
        onOpenChange={setIsDeactivateDialogOpen}
      >
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Deactivate User</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to deactivate this user?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={handleDeactivateUser}
              >
                Deactivate
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Flex>
  )
}
