import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Grid, ScrollArea } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { FavoriteView } from '@/ui/medications/patient-medications-widget/patient-medication-dialog/shared'
import { sanitizeFormData } from '@/utils'
import { rxChangeRequestAction, rxRenewalAction } from '../actions'
import { useStore } from '../store'
import {
  MedicationRefill,
  MedicationRefillAPIRequest,
  PharmacyNotificationType,
  RenewalResponseTypeEnum,
} from '../types'
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
  const { searchMedicationsList, activeTab } = useStore()
  const isRefillTab = activeTab.includes('Refill')

  const form = useForm<UpdateMedicationSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: data,
  })
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data: UpdateMedicationSchema) => {
    if (!data.drugList || data.drugList.length === 0) return
    if (isRefillTab) {
      await handleRxApproval(data)
    } else {
      await handleChangeRequestApproval(data)
    }
    const formattedData: MedicationRefillAPIRequest = {
      notificationType: isRefillTab
        ? PharmacyNotificationType.PharmacyRxRenewalRequest
        : PharmacyNotificationType.PharmacyRxChangeRequest,
    }

    searchMedicationsList(formattedData)
    onCloseModal(false)
  }
  const handleRxApproval = async (data: UpdateMedicationSchema) => {
    setIsLoading(true)

    for (const row of data.drugList ?? []) {
      const payload = {
        responseType: RenewalResponseTypeEnum.Approved,
         note: '',
        rxRenewalResponseDrugDetail: {
          drugDescription: row?.drugDescription ?? '',
          quantityValue: row?.quantityValue?.toString() ?? '0',
          isSubstitutionsAllowed: row?.isSubstitutionsAllowed ?? false,
          drugCode: row?.drugCode ?? '',
          drugCodeQualifier: row?.drugCodeQualifier ?? '',
          daysSupply: row?.daysSupply?.toString() ?? '0',
          signatureText: row?.drugSignatureList?.[0]?.signatureText,
          quantityCodeListQualifier: row?.quantityCodeListQualifier,
          quantityUnitOfMeasureCode: row?.quantityUnitOfMeasureCode,
          refills: row.refills,
        },
      }

      const sanitizeData = sanitizeFormData(payload)

      const response = await rxRenewalAction(
        data.pharmacyNotificationId ?? '',
        sanitizeData,
      )

      if (response.state === 'success') {
        toast.success('Medication request is approved successfully')
      } else {
        toast.error(response.error ?? 'Failed to approve')
      }
    }
    setIsLoading(false)
  }
  const handleChangeRequestApproval = async (data: UpdateMedicationSchema) => {
    setIsLoading(true)

    for (const row of data.drugList ?? []) {
      const payload = {
        responseType: RenewalResponseTypeEnum.Approved,
        note: '',
        rxChangeResponseDrugDetail: {
          drugCode: row?.drugCode ?? '',
          drugCodeQualifier: row?.drugCodeQualifier ?? '',
          drugDescription: row?.drugDescription ?? '',
          quantityValue: row?.quantityValue?.toString() ?? '0',
          quantityCodeListQualifier: row?.quantityCodeListQualifier,
          quantityUnitOfMeasureCode: row?.quantityUnitOfMeasureCode,
          signatureText: row?.drugSignatureList?.[0]?.signatureText,
          refills: row.refills,
          isSubstitutionsAllowed: row?.isSubstitutionsAllowed ?? false,
          daysSupply: row?.daysSupply?.toString() ?? '0',
        },
      }

      const sanitizeData = sanitizeFormData(payload)

      const response = await rxChangeRequestAction(
        data.pharmacyNotificationId ?? '',
        sanitizeData,
      )
      if (response.state === 'success') {
        toast.success('Medication request is approved successfully')
      } else {
        toast.error(response.error ?? 'Failed to approve')
      }
    }
    setIsLoading(false)
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
            disabled={isLoading}
            loading={isLoading}
          >
            Save & Approve
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { UpdateMedicationForm }
