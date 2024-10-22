'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Table } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { DateTimeCell, FormContainer, LoadingPlaceholder } from '@/components'
import { cn, formatDateTime } from '@/utils'
import { UnitSystem, VITAL_TABLE_LABELS } from '../../constants'
import { useStore } from '../../store'
import { getFormField, getUnitValue } from '../../utils'
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
  appointmentId: string
  unitSystem: UnitSystem
  setAddNewRecord: (value: boolean) => void
}

const AddVitalsForm = ({
  patientId,
  appointmentId,
  unitSystem,
  setAddNewRecord,
}: AddVitalsFormProps) => {
  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    form.reset()
  }

  if (loading) return

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Box className="w-full">
        <Table.Root variant="ghost" size="1">
          <Table.Header className="bg-pp-focus-bg-2">
            <Table.Row>
              <Table.ColumnHeaderCell className="border-pp-table-border bg-pp-focus-bg-2 h-6 border px-1 py-0">
                <DateTimeCell>
                  {formatDateTime(new Date().toISOString())}
                </DateTimeCell>
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.values(VITAL_TABLE_LABELS).map((label, index) => (
              <Table.Row key={label}>
                <Table.Cell
                  className={cn(
                    'border-pp-table-border border px-1 py-0 align-middle',
                    index >= Object.values(VITAL_TABLE_LABELS).length - 2 &&
                      data &&
                      data.length > 5
                      ? 'h-[33px]'
                      : 'h-7',
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
