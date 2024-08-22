import React from 'react'
import {
  Cross2Icon,
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { useToast } from 'node_modules/@psychplus/ui/src/toast-provider'
import { ActiveCodeAttribute } from '@psychplus/codeset'
import { updateActiveCodeAttribute } from '@psychplus/codeset/api.client'
import {
  DeleteConfirmDialog,
  useDeleteConfirmDialog,
} from '@psychplus/ui/delete-confirm-dialog'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../store'

interface ActiveCodesetAttributesTableRowActionsProps {
  data: Partial<ActiveCodeAttribute>
  codeId: string
}

const ActiveCodesetAttributesTableRowActions = ({
  data,
  codeId,
}: ActiveCodesetAttributesTableRowActionsProps) => {
  const {
    codeSet,
    assigningAuthority,
    setNewAttribute,
    editableAttribute,
    setAttributeErrors,
    setEditableAttribute,
    setAttributes,
    attributes,
  } = useStore((state) => ({
    codeSet: state.codeSet,
    assigningAuthority: state.assigningAuthority,
    setNewAttribute: state.setNewAttribute,
    editableAttribute: state.editableAttribute,
    setAttributeErrors: state.setAttributeErrors,
    setEditableAttribute: state.setEditableAttribute,
    attributes: state.attributes,
    setAttributes: state.setAttributes,
  }))
  const { toast } = useToast()
  const { isDeleteConfirmDialogOpen, toggleDeleteConfirmDialog } =
    useDeleteConfirmDialog()

  const handleMenuItemSelect = (item: string) => {
    switch (item) {
      case 'Edit':
        setEditableAttribute(data)
        setNewAttribute(null)
        setAttributeErrors({})
        break

      case 'Delete':
        toggleDeleteConfirmDialog()
        break

      case 'Cancel':
        if (editableAttribute) {
          setEditableAttribute(null)
          setAttributeErrors({})
        }
        break

      default:
        break
    }
  }

  const onDelete = async () => {
    if (!assigningAuthority?.id || !codeSet?.id || !codeId || !data.id) {
      toast({ type: 'error', title: 'Missing required information' })
      return
    }
    try {
      const result = await updateActiveCodeAttribute(
        assigningAuthority?.id,
        codeSet?.id,
        codeId,
        data.id,
        { ...data, recordStatus: 'Deleted', codeId },
      )

      if (!result) return

      if (attributes?.length) {
        const updatedAttributes = attributes.filter(
          (item) => item.id !== data.id,
        )
        setAttributes(updatedAttributes)
      }
      toast({ type: 'success', title: 'Attribute deleted successfully' })
      setEditableAttribute(null)
      setAttributeErrors({})
    } catch (err: unknown) {
      const { message } = err as { message?: string }
      toggleDeleteConfirmDialog()
      toast({
        type: 'error',
        title: message,
      })
    }
  }

  const getIconForMenuItem = (item: string) => {
    switch (item) {
      case 'Edit':
        return <Pencil1Icon />
      case 'Delete':
        return <TrashIcon />
      case 'Cancel':
        return <Cross2Icon />
      default:
        return null
    }
  }

  const showEditButton = data?.id !== editableAttribute?.id
  const showCancelButton = data?.id === editableAttribute?.id

  const menuItems = [
    showEditButton ? 'Edit' : null,
    'Delete',
    showCancelButton ? 'Cancel' : null,
  ].filter(Boolean)

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <DotsHorizontalIcon height={16} width={16} color="blue" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-32">
          {menuItems.map((item, index, array) =>
            item ? (
              <React.Fragment key={item}>
                <DropdownMenu.Item
                  className="hover:bg-[#151B4A]"
                  onSelect={() => handleMenuItemSelect(item)}
                >
                  <Flex className="hover:text-[white]" align="center" gap="1">
                    {getIconForMenuItem(item)}
                    <Text size="3">{item}</Text>
                  </Flex>
                </DropdownMenu.Item>
                {index < array.length - 1 && (
                  <DropdownMenu.Separator className="m-0 p-0" />
                )}
              </React.Fragment>
            ) : null,
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DeleteConfirmDialog
        isOpen={isDeleteConfirmDialogOpen}
        closeDialog={toggleDeleteConfirmDialog}
        onDelete={onDelete}
      />
    </>
  )
}

export { ActiveCodesetAttributesTableRowActions }
