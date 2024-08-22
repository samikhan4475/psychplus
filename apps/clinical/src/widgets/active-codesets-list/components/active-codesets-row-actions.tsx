import React from 'react'
import {
  Cross2Icon,
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { useToast } from 'node_modules/@psychplus/ui/src/toast-provider'
import { ActiveCode } from '@psychplus/codeset'
import { updateActiveCode } from '@psychplus/codeset/api.client'
import {
  DeleteConfirmDialog,
  useDeleteConfirmDialog,
} from '@psychplus/ui/delete-confirm-dialog'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { usePubsub } from '@psychplus/utils/event'
import { EVENT_ACTIVE_CODSET_DELETED } from '@psychplus/widgets/events'
import { useActiveCodeAttributeDialog } from '../hooks'
import { useStore } from '../store'
import { AttributeDialog } from './active-code-attribute-dialogue'

const ActiveCodesetsTableRowActions = ({
  data,
}: {
  data: Partial<ActiveCode>
}) => {
  const { isDialogOpen, toggleDialog } = useActiveCodeAttributeDialog()
  const { isDeleteConfirmDialogOpen, toggleDeleteConfirmDialog } =
    useDeleteConfirmDialog()

  const {
    codeSet,
    setCodeSet,
    setCodeErrors,
    setNewCode,
    setEditableCode,
    assigningAuthority,
    editableCode,
  } = useStore((state) => ({
    codeSet: state.codeSet,
    setCodeSet: state.setCodeSet,
    setCodeErrors: state.setCodeErrors,
    setNewCode: state.setNewCode,
    setEditableCode: state.setEditableCode,
    assigningAuthority: state.assigningAuthority,
    editableCode: state.editableCode,
  }))

  const { toast } = useToast()
  const { publish } = usePubsub()

  const handleMenuItemSelect = (item: string) => {
    switch (item) {
      case 'Edit':
        setEditableCode(data)
        setNewCode(null)
        setCodeErrors({})
        break

      case 'Delete':
        toggleDeleteConfirmDialog()
        break

      case 'Manage Attributes':
        toggleDialog()
        setEditableCode(data)
        break

      case 'Cancel':
        if (editableCode) {
          setEditableCode(null)
          setCodeErrors({})
        }
        break

      default:
        break
    }
  }
  const onDelete = async () => {
    if (!data?.id || !assigningAuthority?.id || !codeSet?.id) return

    try {
      const result = await updateActiveCode(
        assigningAuthority?.id,
        codeSet.id,
        data.id,
        { ...data, recordStatus: 'Deleted' },
      )

      if (!result) return
      const temp = {
        ...codeSet,
        codes: codeSet?.codes?.filter(
          (item: ActiveCode) => item.id !== data.id,
        ),
      }
      toast({ type: 'success', title: 'Code deleted successfully' })
      setEditableCode(null)
      setCodeSet(temp)
      publish(EVENT_ACTIVE_CODSET_DELETED)
      setCodeErrors({})
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
      case 'Manage Attributes':
        return <Pencil1Icon />
      case 'Delete':
        return <TrashIcon />
      case 'Cancel':
        return <Cross2Icon />
      default:
        return null
    }
  }
  const showEditAndAttributeButton = data?.id !== editableCode?.id
  const showCancelButton = data?.id === editableCode?.id

  const menuItems = [
    showEditAndAttributeButton ? 'Edit' : null,
    'Delete',
    showEditAndAttributeButton ? 'Manage Attributes' : null,
    showCancelButton ? 'Cancel' : null,
  ].filter(Boolean)

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger>
          <DotsHorizontalIcon height={16} width={16} color="blue" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-full">
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

      {isDialogOpen && (
        <AttributeDialog
          isDialogOpen={isDialogOpen}
          toggleDialog={toggleDialog}
          data={data}
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteConfirmDialogOpen}
        closeDialog={toggleDeleteConfirmDialog}
        onDelete={onDelete}
      />
    </>
  )
}

export { ActiveCodesetsTableRowActions }
