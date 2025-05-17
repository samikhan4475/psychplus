import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Grid, ScrollArea } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { FavoriteView } from '@/ui/medications/patient-medications-widget/patient-medication-dialog/shared'
import { sanitizeFormData } from '@/utils'
import { rxRenewalAction } from '../actions'
import { useStore } from '../store'
import { MedicationRefill, RenewalResponseTypeEnum } from '../types'
import { DrugInteractionAccordian } from './drug-interaction-accordion'
import { PatientPrescriptionAccordian } from './patient-medication-accordion'
import { PatientSelect } from './patient-select'
import { schema, UpdateMedicationSchema } from './schema'

interface UpdateMedicationFormProps {
  data: MedicationRefill
  onCloseModal: (open: boolean) => void
}

const UpdateMedicationForm = ({
  data,
  onCloseModal,
}: UpdateMedicationFormProps) => {
  const { searchMedicationsList } = useStore()
  const form = useForm<UpdateMedicationSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: data,
  })
  const onSubmit = async (data: UpdateMedicationSchema) => {
    if (!data.drugList || data.drugList.length === 0) return

    for (const row of data.drugList) {
      const payload = {
        responseType: RenewalResponseTypeEnum.Approved,
        referenceNumber: data.rxReferenceNumber ?? '',
        note: row.notes ?? '',
        numberOfRefills: 1,
        rxRenewalResponseDrugDetail: {
          drugDescription: row?.drugDescription ?? '',
          quantityValue: row?.quantityValue?.toString() ?? '0',
          isSubstitutionsAllowed: row?.isSubstitutionsAllowed ?? false,
          drugCode: row?.drugCode ?? '',
          drugCodeQualifier: row?.drugCodeQualifier ?? '',
          daysSupply: row?.daysSupply?.toString() ?? '0',
        },
      }
      const sanitizeData = sanitizeFormData(payload)
      const response = await rxRenewalAction(
        data.pharmacyNotificationId ?? '',
        sanitizeData,
      )
      if (response.state === 'success') {
        toast.success('Medication request is approved successfully')
        searchMedicationsList({})
        onCloseModal(false)
      } else {
        toast.error(response.error ?? 'Failed to approved ')
        searchMedicationsList({})
        onCloseModal(false)
      }
    }
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex gap="2" justify="between" direction="column" className="relative">
        <Grid columns="2" gap="2">
          <Flex direction="column" gap="1" flexGrow="1">
            <PatientSelect />
            <ScrollArea
              scrollbars="vertical"
              className="max-h-[70dvh] overflow-visible pr-2"
            >
              <DrugInteractionAccordian />
              <PatientPrescriptionAccordian />
            </ScrollArea>
          </Flex>
          <FavoriteView />
        </Grid>
        <Flex gap="2" justify="end">
          <Button
            type="submit"
            size="2"
            highContrast
            variant="outline"
            color="gray"
            className="text-black"
          >
            Save & Approve
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { UpdateMedicationForm }
