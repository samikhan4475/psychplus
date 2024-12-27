import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../../lab-orders-widget/store'
import { deleteTestLabsApi } from '../api'
import { LabOrderSchemaType } from '../lab-order-schema'
import { DeleteDialog } from './delete-dialog'
import { TableRow } from './table-row'
import { TestLabsType } from './types'

const TestLabItem = ({
  testLabData,
  index,
  onDelete,
}: {
  testLabData: TestLabsType
  index: number
  onDelete: (index: number) => void
}) => {
  const [disabled, setDisabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const appointmentId = useSearchParams().get('id') ?? ''
  const form = useFormContext<LabOrderSchemaType>()
  const orderId = form.getValues('labOrderId')
  const { updateLabOrderTestList } = useStore()

  const onClickDeleteConfirm = async () => {
    setDisabled(true)
    if (!testLabData?.isNewTestLab && orderId) {
      const result = await deleteTestLabsApi({
        appointmentId,
        orderId,
        testId: testLabData?.id ?? '',
      })
      if (result.state === 'success') {
        onDelete(index)
        updateLabOrderTestList(orderId, testLabData?.id ?? '')
      }
    } else {
      onDelete(index)
    }
    setDisabled(false)
  }

  const onClickDelete = () => {
    setIsOpen(true)
  }

  return (
    <Table.Row>
      <TableRow
        title={testLabData?.testName ?? ''}
        onDelete={onClickDelete}
        disabled={disabled}
      />
      <DeleteDialog
        open={isOpen}
        onClose={setIsOpen}
        onClick={onClickDeleteConfirm}
      />
    </Table.Row>
  )
}

export { TestLabItem }
