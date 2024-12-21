'use client'

import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { useStore as zustandUseStore } from 'zustand'
import { FormContainer } from '@/components'
import { formatDateToISOString } from '@/utils'
import { EndDateField } from './end-date-field'
import { PharmacyNameSelect } from './pharmacy-name-select'
import { PharmacySelect } from './pharmacy-select'
import { PrescriberSelect } from './prescriber-select'
import { ResetButton } from './reset-button'
import { StatusSelect } from './status-select'
import { useStore } from './store'
import { SubmitButton } from './submit-button'
import { WrittenDateField } from './written-date-field'

const schema = z.object({
  writtenDate: z.custom<DateValue>(),
  endDate: z.custom<DateValue>(),
  drugName: z.string().optional(),
  pharmacyName: z.string().optional(),
  providerName: z.string().optional(),
  prescriptionStatus: z.string().optional(),
})
type PatientMedicationSchemaType = z.infer<typeof schema>
interface UniqueMedications {
  pharmacyName: string
  providerName: string
}

const FilterForm = () => {
  const store = useStore()

  const { data } = zustandUseStore(store, (state) => ({
    data: state.data,
  }))

  const { pharmacyOptions, prescriberOptions } = useMemo(() => {
    const uniqueMedicationsMap = new Set()
    const uniqueMedications: UniqueMedications[] = []

    data?.medications?.forEach((med) => {
      const key = `${med.medicationDetails.pharmacyName}-${med.medicationDetails.providerName}`
      if (!uniqueMedicationsMap.has(key)) {
        uniqueMedicationsMap.add(key)
        uniqueMedications.push({
          pharmacyName: med.medicationDetails.pharmacyName,
          providerName: med.medicationDetails.providerName,
        })
      }
    })

    return {
      pharmacyOptions: uniqueMedications.map(({ pharmacyName }) => ({
        value: pharmacyName,
        label: pharmacyName,
      })),
      prescriberOptions: uniqueMedications.map(({ providerName }) => ({
        value: providerName,
        label: providerName,
      })),
    }
  }, [data?.medications])

  const form = useForm<PatientMedicationSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      writtenDate: undefined,
      endDate: undefined,
      drugName: '',
      providerName: '',
      prescriptionStatus: '',
      pharmacyName: '',
    },
  })
  const onSubmit: SubmitHandler<PatientMedicationSchemaType> = () => {
    //TODO: implement filter logic
  }
  return (
    <FormContainer
      className="bg-white w-full flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <WrittenDateField />
      <EndDateField />
      <PharmacyNameSelect />
      <PrescriberSelect options={prescriberOptions} />
      <PharmacySelect options={pharmacyOptions} />
      <StatusSelect />
      <Flex gap="2" align="center">
        <ResetButton />
        <SubmitButton />
      </Flex>
    </FormContainer>
  )
}

export { FilterForm, type PatientMedicationSchemaType }
