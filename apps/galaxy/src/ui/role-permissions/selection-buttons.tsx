import React from 'react'
import { Button } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useStore } from './store'

interface Props {
  selectedPermissionsId: string
}

const SelectionButtons = ({ selectedPermissionsId }: Props) => {
  const codes = useCodesetCodes(CODESETS.PermissionSection)
  const { selectedPermissions, permissions, setSelectedPermissions } = useStore(
    (state) => ({
      selectedPermissions: state.selectedPermissions,
      setSelectedPermissions: state.setSelectedPermissions,
      permissions: state.permissions,
    }),
  )

  if (selectedPermissionsId !== 'all') {
    return null
  }

  const disabled = codes.length !== Object.keys(permissions).length

  const enableAll = () => {
    const compiled = selectedPermissions
    Object.keys(permissions)?.forEach((permission) => {
      compiled[permission] = permissions[permission].map((p) => p.id)
    })

    setSelectedPermissions(compiled)
  }

  const disableAll = () => {
    const newList = selectedPermissions
    Object.keys(permissions)?.forEach((permission) => {
      newList[permission] = []
    })
    setSelectedPermissions(newList)
  }

  return (
    <>
      <Button
        color="gray"
        className="text-black"
        size="1"
        variant="outline"
        type="button"
        onClick={enableAll}
        disabled={disabled}
      >
        Enable All
      </Button>
      <Button
        color="gray"
        className="text-black "
        size="1"
        variant="outline"
        type="button"
        onClick={disableAll}
        disabled={disabled}
      >
        Disable All
      </Button>
    </>
  )
}

export { SelectionButtons }
