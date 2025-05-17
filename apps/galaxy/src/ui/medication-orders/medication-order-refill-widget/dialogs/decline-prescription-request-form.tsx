import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormContainer,
  FormFieldContainer,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import {
  getAgeFromDate,
  getCalendarDate,
  getPatientDOB,
  sanitizeFormData,
} from '@/utils'
import { rxRenewalAction } from '../actions'
import { useStore } from '../store'
import {
  DENIEDOPTIONS,
  MedicationRefill,
  RenewalResponseTypeEnum,
} from '../types'
import { schema, UpdateMedicationSchema } from './schema'

interface DeclineMedicationFormProps {
  data: MedicationRefill
  onCloseModal: (open: boolean) => void
}

const DeclineMedicationForm = ({
  data,
  onCloseModal,
}: DeclineMedicationFormProps) => {
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
        responseType: RenewalResponseTypeEnum.Denied,
        referenceNumber: data.rxReferenceNumber ?? '',
        note: row.notes ?? '',
        numberOfRefills: 0,
        denialReasonType: row.deniedReason,
        denialReasonDetail: row.notes,
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
        toast.success('Medication request is decline successfully')
        searchMedicationsList({})
        onCloseModal(false)
      } else {
        toast.error(response.error ?? 'Failed to decline ')
        searchMedicationsList({})
        onCloseModal(false)
      }
    }
  }
  const drugs = data.drugList ?? []
  const patientLastName = data.patientLastName
  const patientFirstName = data.patientFirstName
  const patientDateOfBirth = data.patientDateOfBirth
  const patientGender = data.patientGender

  const patientName = `${patientFirstName} ${patientLastName}`
  const patientSummary = `${patientName}, ${getPatientDOB(
    patientDateOfBirth ?? '',
  )} | ${getAgeFromDate(getCalendarDate(patientDateOfBirth))} yo ${
    patientGender?.charAt(0) || ''
  }`
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex gap="2" justify="between" direction="column" className="relative">
        {drugs.map((item, index) => (
          <>
            <Flex
              key={`drugs-${item.drugDescription}`}
              gap="2"
              className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left"
            >
              <Text size="1">
                {item.drugDescription ?? 'No Description Found'}
              </Text>
            </Flex>
            <FormFieldContainer className="flex-1">
              <FormFieldLabel>Patient Name</FormFieldLabel>
              <TextField.Root
                value={patientSummary}
                className="h-6  w-full"
                size="1"
                disabled
              />
            </FormFieldContainer>

            <FormFieldContainer className="flex-1">
              <FormFieldLabel>Select Reason</FormFieldLabel>
              <SelectInput
                options={DENIEDOPTIONS}
                name={`drugList.${index}.deniedReason`}
                buttonClassName="w-full"
                className="h-6 w-full"
                onValueChange={(e) =>
                  form.setValue(`drugList.${index}.deniedReason`, e)
                }
              />
            </FormFieldContainer>

            <FormFieldContainer className="flex-1">
              <FormFieldLabel>Notes</FormFieldLabel>
              {/* <TextInput
                field={`drugList.${index}.notes`}
                placeHolder="Add notes"
                className="mt-1 h-6 w-full "
              /> */}
              <TextArea
                placeholder="Notes here"
                className=" h-6 w-full"
                size="1"
                maxLength={4000}
                onChange={(e) =>
                  form.setValue(`drugList.${index}.notes`, e.target.value)
                }
              />
            </FormFieldContainer>
          </>
        ))}

        <Flex gap="2" justify="end">
          <Button
            type="submit"
            size="2"
            highContrast
            variant="outline"
            color="gray"
            className="text-black"
          >
            Decline
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { DeclineMedicationForm }
