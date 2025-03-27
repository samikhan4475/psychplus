import { type Row } from '@tanstack/react-table'
import { Pencil, PencilLine } from 'lucide-react'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { Button, Flex, Text } from '@radix-ui/themes'

type VisitListRow = Row<any>

const rowActions: RowAction<any>[] = [
  {
    id: 'edit',
    render: ({ row }) => (
      <PencilLine size={20} className="text-gray-500 cursor-pointer" />
    ),
  },
  {
    id: 'decline',
    render: ({ row }) => (
      <Button
      className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
      type="button"
    >
      <Text className="text-pp-black-3 text-1">Decline</Text>
    </Button>
    ),
  },
  {
    id: 'approve',
    render: ({ row }) => (
      <Button
      className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
      type="button"
    >
      <Text className="text-pp-black-3 text-1">Approve</Text>
    </Button>
    ),
  },
]

const ActionsCell = (row: any) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
