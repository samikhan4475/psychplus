import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { deleteDiagnosisApi } from '../api'
import { LabOrderSchemaType } from '../lab-order-schema'
import { DeleteDialog } from './delete-dialog'
import { TableRow } from './table-row'
import { DiagnosisType } from './types'

const DiagnosisItem = ({
  diagnosisData,
  index,
  onDelete,
}: {
  diagnosisData: DiagnosisType
  index: number
  onDelete: (index: number) => void
}) => {
  const [disabled, setDisabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const appointmentId = useSearchParams().get('id') ?? ''
  const form = useFormContext<LabOrderSchemaType>()
  const orderId = form.getValues('labOrderId')

  const onClickDeleteConfirm = async () => {
    setDisabled(true)
    if (!diagnosisData?.newDignoses && orderId) {
      const result = await deleteDiagnosisApi({
        appointmentId,
        orderId,
        diagnosisId: diagnosisData?.id ?? '',
      })
      if (result.state === 'success') {
        onDelete(index)
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
        title={`${diagnosisData?.code ?? ''} ${
          diagnosisData?.description ?? ''
        }`}
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

export { DiagnosisItem }
