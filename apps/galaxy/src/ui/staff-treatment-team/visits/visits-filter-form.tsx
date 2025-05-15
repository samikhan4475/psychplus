'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { getCalendarDateLabel, getDateString } from '@/ui/schedule/utils'
import { sanitizeFormData } from '@/utils'
import { ClearButton } from './clear-button'
import { HideFiltersButton } from './hide-filter-button'
import { useStore } from './store'
import { VisitListPayload } from './types'
import {
  DobField,
  FromDateField,
  SearchByMRNField,
  SearchByNameField,
  ToDateField,
  VisitIdField,
  VisitTypeDropdown,
} from './visits-filter-form-fields'
import { GenderSelect } from './visits-filter-form-fields/gender-select-field'
import { LocationSelect } from './visits-filter-form-fields/location-select'
import { VisitStatusSelect } from './visits-filter-form-fields/visit-status-fields'

const schema = z.object({
  startingDate: z.custom<DateValue | null>().nullable(),
  endingDate: z.custom<DateValue | null>().nullable(),
  name: z.string().optional(),
  dateOfBirth: z.custom<DateValue | null>().nullable(),
  patientId: z.string().optional(),
  appointmentId: z.string().optional(),
  gender: z.string().optional(),
  visitType: z.string().optional(),
  appointmentStatus: z.string().optional(),
  locationId: z.string().optional(),
})

export type VisitsSchemaType = z.infer<typeof schema>

interface Props {
  staffId: string
  isPartialFilterView: boolean
  onHide: () => void
}

const VisitsFilterForm = ({ isPartialFilterView, onHide, staffId }: Props) => {
  const { fetchVisitsList } = useStore((state) => ({
    fetchVisitsList: state.fetchVisitsList,
  }))
  const form = useForm<VisitsSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      startingDate: undefined,
      endingDate: undefined,
      name: '',
      dateOfBirth: undefined,
      patientId: '',
      appointmentId: '',
      visitType: '',
      appointmentStatus: '',
      gender: '',
      locationId: '',
    },
  })

  const onSubmit: SubmitHandler<VisitsSchemaType> = (data) => {
    const formattedData: VisitListPayload = {
      startingDate: getDateString(data.startingDate),
      endingDate: getDateString(data.endingDate),
      dateOfBirth: data.dateOfBirth
        ? getCalendarDateLabel(data.dateOfBirth)
        : undefined,
      appointmentStatuses: data.appointmentStatus
        ? [data.appointmentStatus]
        : undefined,
      providerIds: [Number(staffId)],
      patientIds: data.patientId ? [Number(data.patientId)] : undefined,
      appointmentIds: data.appointmentId
        ? [Number(data.appointmentId)]
        : undefined,
      name: data.name,
      gender: data.gender,
      visitTypes: data.visitType ? [data.visitType] : undefined,
      locationIds: data.locationId ? [data.locationId] : undefined,
    }

    const sanatizedData = sanitizeFormData(formattedData)
    fetchVisitsList(sanatizedData, 1, undefined, true)
  }

  return (
    <FormContainer
      className="bg-white flex-row  gap-1.5 rounded-b-2 rounded-t-1 p-2 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Flex gap="4" className="flex-wrap items-center">
        <>
          <FromDateField />
          <ToDateField />
          <SearchByNameField />
          <DobField />
          <SearchByMRNField />
          <LocationSelect />
        </>
        {isPartialFilterView && (
          <>
            <VisitIdField />
            <VisitTypeDropdown />
            <VisitStatusSelect />
            <GenderSelect />
          </>
        )}

        <Flex className="ml-auto flex items-center space-x-2">
          {isPartialFilterView && <HideFiltersButton onClick={onHide} />}
          <ClearButton />
          <Button highContrast size="1" type="submit">
            <MagnifyingGlassIcon strokeWidth={2} />
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { VisitsFilterForm }
