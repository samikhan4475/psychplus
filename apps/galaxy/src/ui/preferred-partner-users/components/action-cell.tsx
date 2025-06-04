'use client'

import { useState } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { Check, LinkIcon, Pencil, Power, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { PreferredPartnerUser } from '@/types'
import { usePreferredPartnerStore } from '../store'
import { AddAccountLink } from './add-account-link'

interface ActionCellProps {
  original: PreferredPartnerUser
  editMode: string | null
  setEditMode: (id: string | null) => void
}

const isDeleted = (user: PreferredPartnerUser) =>
  user.recordStatus === 'Deleted'

export const ActionCell = ({
  original,
  editMode,
  setEditMode,
}: ActionCellProps) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const isRecordDeleted = isDeleted(original)
  const { commitTempChanges, discardTempChanges } = usePreferredPartnerStore(
    (state) => ({
      commitTempChanges: state.commitTempChanges,
      discardTempChanges: state.discardTempChanges,
    }),
  )

  const renderPowerButton = () => {
    if (isRecordDeleted) {
      return (
        <IconButton
          size="2"
          type="button"
          variant="ghost"
          onClick={() => {
            const { partnerId } = original
            toast.promise(
              usePreferredPartnerStore
                .getState()
                .activateUser(partnerId, original.id),
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
      )
    }

    if (original.recordStatus === 'Active') {
      return (
        <IconButton
          size="2"
          type="button"
          variant="ghost"
          onClick={() => {
            const { partnerId } = original
            toast.promise(
              usePreferredPartnerStore
                .getState()
                .deactivateUser(partnerId, original.id),
              {
                loading: 'Deactivating user...',
                success: 'User deactivated successfully',
                error: (err) =>
                  `Error: ${err.message ?? 'Failed to deactivate user'}`,
              },
            )
          }}
        >
          <Power size={16} color={'#ef4444'} />
        </IconButton>
      )
    }

    return (
      <IconButton
        size="2"
        type="button"
        variant="ghost"
        onClick={() => {
          const { partnerId } = original
          toast.promise(
            usePreferredPartnerStore
              .getState()
              .activateUser(partnerId, original.id),
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
    )
  }

  return (
    <Flex gap="2" align="center" justify="end">
      {editMode === original.id ? (
        <>
          <IconButton
            size="2"
            type="button"
            variant="ghost"
            onClick={() => {
              toast.promise(
                commitTempChanges(original.partnerId, original.id),
                {
                  loading: 'Updating user...',
                  success: 'User updated successfully',
                  error: (err) =>
                    `Error: ${err?.message ?? 'Failed to update user'}`,
                },
              )
            }}
          >
            <Check size={16} color="#60646C" />
          </IconButton>
          <IconButton
            size="2"
            type="button"
            variant="ghost"
            onClick={() => {
              discardTempChanges(original.id)
            }}
          >
            <X size={16} color="#60646C" />
          </IconButton>
        </>
      ) : (
        <>
          {!isRecordDeleted && (
            <IconButton
              size="2"
              type="button"
              variant="ghost"
              onClick={() => {
                const { partnerId } = original
                toast.promise(
                  usePreferredPartnerStore
                    .getState()
                    .deleteUser(partnerId, original.id),
                  {
                    loading: 'Deleting user...',
                    success: 'User deleted successfully',
                    error: (err) =>
                      `Error: ${err.message ?? 'Failed to delete user'}`,
                  },
                )
              }}
            >
              <Trash2 size={16} color="#60646C" />
            </IconButton>
          )}
          {renderPowerButton()}
          {!isRecordDeleted && (
            <IconButton
              size="2"
              type="button"
              variant="ghost"
              onClick={() => {
                setEditMode(original.id)
              }}
            >
              <Pencil size={16} color={'#60646C'} />
            </IconButton>
          )}
          {!isRecordDeleted && original.matchStatus === 'Reconcile' && (
            <>
              <IconButton
                size="2"
                type="button"
                variant="ghost"
                onClick={() => setIsLinkDialogOpen(true)}
              >
                <LinkIcon size={16} color={'#60646C'} />
              </IconButton>
              <AddAccountLink
                open={isLinkDialogOpen}
                onOpenChange={setIsLinkDialogOpen}
                preferredPartnerUser={original}
              />
            </>
          )}
        </>
      )}
    </Flex>
  )
}
