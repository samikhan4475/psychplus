'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Table } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { revalidateAction } from '@/actions/revalidate'
import { saveWidgetAction } from '@/actions/save-widget'
import { DateTimeCell, FormContainer } from '@/components'
import { useHasPermission } from '@/hooks'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { transformOut } from '@/ui/vitals/data'
import { cn, formatDateTime, sanitizeFormData } from '@/utils'
import { addPatientVitalAction } from '../../actions'
import { UnitSystem, VITAL_TABLE_LABELS } from '../../constants'
import { useStore } from '../../store'
import { PatientVital } from '../../types'
import {
  createVitalsObject,
  getFormField,
  getUnitValue,
  getVitalRowHeightClass,
  removeNaNValues,
} from '../../utils'
import { CancelButton } from '../cancel'
import { SaveButton } from '../save'
import { BloodPressureField } from './blood-pressure-field'
import { NumberField } from './number-field'

const schema = z.object({
  height: z.string().optional(),
  weight: z.string().optional(),
  bmi: z.string().optional(),
  temperature: z.string().optional(),
  systolic: z.string().optional(),
  diastolic: z.string().optional(),
  headCircumference: z.string().optional(),
  heartRate: z.string().optional(),
  respiratoryRate: z.string().optional(),
  pulseOximetry: z.string().optional(),
  o2Concentration: z.string().optional(),
  bmiPercentile: z.string().optional(),
  headCircumferencePercentile: z.string().optional(),
  weightLengthPercentile: z.string().optional(),
})

export type SchemaType = z.infer<typeof schema>

interface AddVitalsFormProps {
  patientId: string
  unitSystem: UnitSystem
  setAddNewRecord: (value: boolean) => void
  addNewVital(data: PatientVital[]): void
  vitalsData: PatientVital[]
}

const AddVitalsForm = ({
  patientId,
  unitSystem,
  setAddNewRecord,
  addNewVital,
  vitalsData,
}: AddVitalsFormProps) => {
  const { updateWidgetsData, updateActualNoteWidgetsData } =
    useQuickNoteUpdate()

  const {
    data,
    quicknotesData,
    setData,
    setQuicknotesData,
    setError,
    isFilterEnabled,
    setIsErrorAlertOpen,
    setAlertErrorMessage,
  } = useStore((state) => ({
    data: state.data,
    quicknotesData: state.quicknotesData,
    setData: state.setData,
    setQuicknotesData: state.setQuicknotesData,
    setError: state.setError,
    isFilterEnabled: state.isFilterEnabled,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    setAlertErrorMessage: state.setAlertErrorMessage,
  }))
  const { isQuickNoteView } = useQuickNoteUpdate()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })

  const saveAddVitalsPopupPermission = useHasPermission('saveAddVitalsPopup')
  const onSubmit: SubmitHandler<SchemaType> = async (formData) => {
    if (!saveAddVitalsPopupPermission) {
      setIsErrorAlertOpen(true)
      setAlertErrorMessage(
        'You do not have permission to to click on “Save” button to add multiple vitals. Please contact your supervisor if you need any further assistance.',
      )

      return
    }

    if (Object.keys(sanitizeFormData(formData)).length === 0) {
      setError('Add vitals values to save')
      toast.error('Failed to save!')

      return
    }

    const vitalData = {
      ...removeNaNValues({
        ...createVitalsObject(sanitizeFormData(formData), unitSystem),
        patientId,
      }),
      recordStatus: 'Active',
    }

    const response = await addPatientVitalAction(vitalData as PatientVital)

    if (response.state === 'error') {
      setError(response.error || 'Failed to save!')
      toast.error('Failed to save!')

      return
    }
    setError('')
    toast.success('Saved!')
    addNewVital([response.data, ...vitalsData])
    if (!isFilterEnabled) setData([response.data, ...(data as PatientVital[])])
    form.reset()

    const selectedVitalIds =
      quicknotesData?.map((item) => String(item.id)) ?? []

    selectedVitalIds.push(String(response.data.id))

    const payload = transformOut(patientId)({
      vitalsId: selectedVitalIds as string[],
    })

    const result = await saveWidgetAction({ patientId, data: payload })

    if (result.state === 'error') {
      toast.error('Failed to save!')
      return
    }

    updateWidgetsData(payload)
    updateActualNoteWidgetsData(payload)

    if (!isQuickNoteView) revalidateAction()

    setQuicknotesData([
      response.data,
      ...((quicknotesData || []) as PatientVital[]),
    ])
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Box className="w-full">
        <Table.Root variant="ghost" size="1">
          <Table.Header className="bg-pp-focus-bg-2">
            <Table.Row>
              <Table.ColumnHeaderCell className="border-pp-table-border bg-pp-focus-bg-2 h-6 border px-1 py-0">
                <DateTimeCell>
                  {formatDateTime(new Date().toISOString(), false)}
                </DateTimeCell>
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.values(VITAL_TABLE_LABELS).map((label, index) => (
              <Table.Row key={label}>
                <Table.Cell
                  className={cn(
                    'border-pp-table-border border border-t-0 px-1 py-0 align-middle',
                    getVitalRowHeightClass(index, vitalsData),
                  )}
                >
                  {label === VITAL_TABLE_LABELS.bloodPressure ? (
                    <BloodPressureField />
                  ) : (
                    <NumberField
                      field={getFormField(label) as SchemaType}
                      className="w-[87px]"
                      unit={getUnitValue(label, unitSystem)}
                    />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Flex className="shadow-6" gap="2" p="1">
          <CancelButton onCancel={() => setAddNewRecord(false)} />

          <SaveButton />
        </Flex>
      </Box>
    </FormContainer>
  )
}

export { AddVitalsForm }
