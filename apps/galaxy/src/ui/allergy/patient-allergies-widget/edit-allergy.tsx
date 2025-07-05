import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, parseDate, parseTime } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { useStore } from '@/store'
import { mapToUTCString } from '@/ui/notes/create-note/utils'
import { convertToTimezone } from '@/ui/visit/utils'
import { updateAllergy } from './actions'
import { AllergySaveButton } from './allergy-save-button'
import { AllergySpecificationView } from './allergy-specification-view'
import { AddAllergySchemaType, schema } from './schema'
import { AllergyDataResponse } from './types'
import { getStatusLabel } from './utils'

interface EditAllergyProps {
  patientId: string
  row: Row<AllergyDataResponse>
  onCloseEditAllergy: () => void
}

const EditAllergy = ({
  patientId,
  row,
  onCloseEditAllergy,
}: EditAllergyProps) => {
  const form = useForm<AddAllergySchemaType>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(row),
  })

  const staff = useStore((store) => store.staffResource)

  const handleEditAllergy = async (e: AddAllergySchemaType) => {
    const allergy = e.allergies[0]
    const onsetBegan = allergy.startDate
      ? mapToUTCString(
          `${allergy.startDate}T${
            allergy.startTime ?? '00:00:00'
          }[${getLocalTimeZone()}]`,
        )
      : ''

    const onsetEnded = allergy.endDate
      ? mapToUTCString(
          `${allergy.endDate}T${
            allergy.endTime ?? '00:00:00'
          }[${getLocalTimeZone()}]`,
        )
      : null

    const resp = await updateAllergy(patientId, row.original.id, {
      id: row.original.id,
      patientId: Number(patientId),
      allergyName: allergy.allergyName,
      encounterId: 0,
      rxNormCode: null,
      allergyType: allergy.allergyType,
      severityCode: allergy.severityCode,
      comment: allergy.comment,
      onsetBegan,
      onsetEnded,
      reactionId: allergy.reactionId ?? null,
      staffId: Number(staff.id),
      providerId: Number(staff.id),
      recordStatus: allergy.status ?? 'Active',
      ...(row.original.appointmentId && {
        appointmentId: Number(row.original.appointmentId),
      }),
    })
    if (resp.state === 'error') {
      toast.error(resp.error)
      return
    }
    onCloseEditAllergy()
  }

  return (
    <FormContainer form={form} onSubmit={handleEditAllergy}>
      <AllergySpecificationView index={0} isEditMode />
      <Flex my="2" justify="end">
        <AllergySaveButton />
      </Flex>
    </FormContainer>
  )
}

export { EditAllergy }

const getDefaultValues = (row: Row<AllergyDataResponse>) => async () => {
  const startDateTime = convertToTimezone(row.original.onsetBegan) || {}

  const endDateTime = convertToTimezone(row.original.onsetEnded) || {}
  return {
    allergies: [
      {
        ...row.original,
        status: getStatusLabel(Number(row.original.archive)),
        startDate: startDateTime.date ?? parseDate(row.original.onsetBegan),
        endDate:
          endDateTime.date ??
          (row.original.onsetEnded
            ? parseDate(row.original.onsetEnded)
            : undefined),
      },
    ],
  }
}
