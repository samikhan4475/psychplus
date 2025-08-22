import React from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { ELIGIBILITY_TABLE_PAGE_SIZE } from '../constants'
import { DateofServiceField } from './date-of-service-field'
import { LocationSelect } from './location-select'
import { PracticeSelect } from './practice-select'
import { ProviderSelect } from './provider-select'
import { useStore } from './store'

const schema = z
  .object({
    summaryId: z.string(),
    patientId: z.string(),
    payerId: z.string(),
    memberId: z.string(),
    patientInsurancePolicyId: z.string(),
    locationId: z.string(),
    practiceId: z.string(),
    providerStaffId: z.string(),
    serviceDate: z.custom<DateValue | null>(),
    serviceTypeCode: z.string(),
  })
  .partial()

type SchemaType = z.infer<typeof schema>
interface CheckEligibilityFilterFormProps {
  patientId?: string
}
const CheckEligibilityFilterForm = ({
  patientId,
}: CheckEligibilityFilterFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      summaryId: '',
      patientId,
      payerId: '',
      memberId: '',
      patientInsurancePolicyId: '',
      locationId: '',
      practiceId: '',
      providerStaffId: '',
      serviceDate: null,
      serviceTypeCode: '',
    },
  })

  const search = useStore((state) => state.search)

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const payload = {
      ...data,
      serviceDate: data.serviceDate
        ? formatDateToISOString(data.serviceDate)
        : '',
    }
    const cleanedData = sanitizeFormData(payload)
    search(cleanedData, 1, ELIGIBILITY_TABLE_PAGE_SIZE, true)
  }

  const onClear = () => {
    form?.reset()
    search({ patientId }, 1, ELIGIBILITY_TABLE_PAGE_SIZE, true)
  }

  return (
    <FormContainer
      className="bg-white mb-2 gap-1.5 py-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid className="w-full" gap="2" columns="3">
        <LocationSelect />
        <PracticeSelect />
        <ProviderSelect />
        <DateofServiceField />
        <Flex gapX="1">
          <Button
            variant="outline"
            size="1"
            color="gray"
            type="button"
            className="text-black"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button type="submit" size="1" highContrast>
            <MagnifyingGlassIcon width="14px" height="14px" />
          </Button>
        </Flex>
      </Grid>
    </FormContainer>
  )
}

export { CheckEligibilityFilterForm, type SchemaType }
