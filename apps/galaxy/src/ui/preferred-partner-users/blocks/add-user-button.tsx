'use client'

import React, { useState } from 'react'
import { Button, Text } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'
import { usePreferredPartnerStore } from '../store'
import { PreferredPartnerUserUploadDialog } from './preferred-partner-user-upload-dialog'

interface AddUserButtonProps {
  ppid: string
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ ppid }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { searchActiveUsers, searchWorklist } = usePreferredPartnerStore(
    (state) => ({
      searchActiveUsers: state.searchActiveUsers,
      searchWorklist: state.searchWorklist,
    }),
  )

  const handleUploadSuccess = () => {
    searchActiveUsers(ppid, {}, 1, true)
    searchWorklist(ppid, {}, 1, true)
  }

  return (
    <>
      <Button
        className="ml-auto"
        size="1"
        highContrast
        onClick={() => setIsDialogOpen(true)}
      >
        <PlusIcon height={16} width={16} />
        <Text>Add User</Text>
      </Button>

      <PreferredPartnerUserUploadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        ppid={ppid}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  )
}

export { AddUserButton }
