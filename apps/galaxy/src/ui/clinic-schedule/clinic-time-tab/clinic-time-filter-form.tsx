import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import {
  AgeGroupSelect,
  BookingFrequency,
  CosignerSelect,
  DaySelect,
  PrimaryStateSelect,
  PublicViewSelect,
  RecurrenceSelect,
  ServiceSelect,
  StatusSelect,
  TeleStateSelect,
  VisitMediumSelect,
  VisitType,
} from './filter-fields'
import { ClinicTimeFilterSchemaType, schema } from './schema'
import { useStore } from './store'
import { PropsWithStaffId } from './types'

const ClinicTimeFilterForm = ({ staffId }: PropsWithStaffId) => {
  const form = useForm<ClinicTimeFilterSchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      primaryStateCode: '',
      teleStateCode: '',
      servicesOffered: '',
      dayOfSchedule: '',
      weeklyRecurrence: '',
      visitMedium: '',
      ageGroup: '',
      cosignerStaffId: '',
      isPublicViewable: '',
      scheduleStatus: 'active',
      visitType: '',
    },
  })
  const { fetchClinicSchedules } = useStore((state) => ({
    fetchClinicSchedules: state.fetchClinicSchedules,
  }))

  const handleClear = () => {
    form.reset()
    form.setValue('scheduleStatus', '')
    fetchClinicSchedules(staffId)
  }

  const onSubmit: SubmitHandler<ClinicTimeFilterSchemaType> = (e) => {
    const sanitizedPayload = sanitizeFormData(e)
    fetchClinicSchedules(staffId, undefined, sanitizedPayload)
  }
  return (
    <Flex className="bg-white mt-[3px]" px="2" py="1">
      <FormContainer form={form} onSubmit={onSubmit} className="gap-2">
        <Flex align="center" className="gap-1.5">
          <PrimaryStateSelect />
          <TeleStateSelect />
          <ServiceSelect />
          <VisitType />
          <BookingFrequency />
          <DaySelect />
        </Flex>
        <Flex align="center" className="gap-1.5">
          <RecurrenceSelect />
          <VisitMediumSelect />
          <AgeGroupSelect />
          <CosignerSelect />
          <PublicViewSelect />
          <StatusSelect />
          <Button
            size="1"
            variant="outline"
            color="gray"
            className="text-black"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button size="1" variant="solid" highContrast type="submit">
            <SearchIcon width={14} height={14} />
          </Button>
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export { ClinicTimeFilterForm }
