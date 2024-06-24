import React from 'react'
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { useToast } from 'node_modules/@psychplus/ui/src/toast-provider'
import { deleteHealthConcern } from '@psychplus/health-concerns/api.client'
import { type HealthConcern } from '@psychplus/health-concerns/types'
import {
  DeleteConfirmDialog,
  useDeleteConfirmDialog,
} from '@psychplus/ui/delete-confirm-dialog'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import {
  HealthConcernDialogWidgetClient,
  useHealthConcernDialog,
} from '@/widgets/health-concern-dialog'
import { useStore } from '../store'

const HealthConcernsTableRowActions = ({ data }: { data: HealthConcern }) => {
  const { isDialogOpen, toggleDialog } = useHealthConcernDialog()
  const { isDeleteConfirmDialogOpen, toggleDeleteConfirmDialog } =
    useDeleteConfirmDialog()

  const { healthConcerns, setHealthConcerns } = useStore()
  const { toast } = useToast()

  const handleMenuItemSelect = (item: string) => {
    if (item === 'Edit') toggleDialog()
    if (item === 'Delete') toggleDeleteConfirmDialog()
  }

  const onDelete = async () => {
    try {
      await deleteHealthConcern(data)
      setHealthConcerns(healthConcerns.filter((item) => item.id !== data.id))
      toggleDeleteConfirmDialog()
      toast({
        type: 'success',
        title: 'Recorded deleted successfully',
      })
    } catch (err) {
      toggleDeleteConfirmDialog()

      if (err instanceof Error) {
        toast({
          type: 'error',
          title: err.message,
        })
      } else {
        toast({
          type: 'error',
          title: 'An unknown error occurred',
        })
      }
    }
  }

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger>
          <DotsHorizontalIcon height={16} width={16} color="blue" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-32">
          {['Edit', 'Delete'].map((item, index, array) => (
            <React.Fragment key={item}>
              <DropdownMenu.Item
                className="hover:bg-[#151B4A]"
                onSelect={() => handleMenuItemSelect(item)}
              >
                <Flex className="hover:text-[white]" align="center" gap="1">
                  {item === 'Edit' ? <Pencil1Icon /> : <TrashIcon />}
                  <Text size="3">{item}</Text>
                </Flex>
              </DropdownMenu.Item>
              {index < array.length - 1 && (
                <DropdownMenu.Separator className="m-0 p-0" />
              )}
            </React.Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <HealthConcernDialogWidgetClient
        isEdit={true}
        isDialogOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        data={data}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteConfirmDialogOpen}
        closeDialog={toggleDeleteConfirmDialog}
        onDelete={onDelete}
      />
    </>
  )
}

export { HealthConcernsTableRowActions }
