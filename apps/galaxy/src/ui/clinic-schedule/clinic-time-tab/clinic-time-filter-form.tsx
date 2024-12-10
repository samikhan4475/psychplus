import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import {
  AgeGroupSelect,
  BookingFrequencySelect,
  CosignerSelect,
  DaySelect,
  PrimaryStateSelect,
  PublicViewSelect,
  RecurrenceSelect,
  ServiceSelect,
  StatusSelect,
  TeleStateSelect,
  VisitMediumSelect,
} from './filter-fields'

const schema = z.object({
  primaryState: z.ostring(),
  teleState: z.ostring(),
  service: z.ostring(),
  day: z.ostring(),
  recurrence: z.ostring(),
  bookingFrequency: z.ostring(),
  visitMedium: z.ostring(),
  ageGroup: z.ostring(),
  cosigner: z.ostring(),
  publicView: z.ostring(),
  status: z.ostring(),
})

type ClinicTimeFilterSchemaType = z.infer<typeof schema>

const ClinicTimeFilterForm = () => {
  const form = useForm<ClinicTimeFilterSchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<ClinicTimeFilterSchemaType> = () => {
    //TODO: integrate Filter API
  }

  return (
    <Flex className="bg-white mt-[3px]" px="2" py="1">
      <FormContainer form={form} onSubmit={onSubmit} className="gap-2">
        <Flex align="center" className="gap-1.5">
          <PrimaryStateSelect />
          <TeleStateSelect />
          <ServiceSelect />
          <DaySelect />
          <RecurrenceSelect />
          <BookingFrequencySelect />
        </Flex>
        <Flex align="center" className="gap-1.5">
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
