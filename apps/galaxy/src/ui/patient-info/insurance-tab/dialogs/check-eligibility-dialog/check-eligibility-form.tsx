import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, RadioGroup } from '@/components'
import { Insurance } from '@/types'
import {
  formatDateToISOString,
  getCalendarDate,
  sanitizeFormData,
} from '@/utils'
import { checkEligibilityAction } from './actions'
import { useStore } from './check-eligibility-log/store'
import { ELIGIBILITY_TABLE_PAGE_SIZE } from './constants'
import { CptCodeSelect } from './cpt-code-select'
import { MemberIdField } from './member-id-field'
import { PatientSelect } from './patient-select'
import { PayerSelect } from './payer-select'
import { PracticeSelect } from './practice-select'
import { ProviderSelect } from './provider-select'
import { schema, SchemaType } from './schema'
import { ServiceDateSelect } from './service-date-select'
import { ServiceTypeSelect } from './service-type-select'
import { StateAndLocationFilters } from './state-and-location-filters'

const serviceOptions = [
  { value: 'service', label: 'Service Type' },
  { value: 'cpt', label: 'CPT Code' },
]

interface CheckEligibilityFormProps {
  insurance?: Insurance
  patientId?: string
}

const CheckEligibilityForm = ({
  insurance,
  patientId,
}: CheckEligibilityFormProps) => {
  const search = useStore((state) => state.search)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: patientId ?? '',
      patientInsurancePolicyId: insurance?.id ?? '',
      practiceId: '',
      providerId: '',
      locationId: '',
      isService: 'service',
      memberId: insurance?.memberId ?? '',
      residingStateCode: '',
      serviceDate: getCalendarDate(),
      serviceTypeCode: '',
      cptCodes: ['99214'],
      authenticatedUserId: 0,
    },
  })
  const onSubmit = async (data: SchemaType) => {
    const payload = {
      ...data,
      serviceDate: data.serviceDate
        ? formatDateToISOString(data.serviceDate)
        : null,
    }
    const sanitizedPayload = sanitizeFormData(payload)
    const result = await checkEligibilityAction(sanitizedPayload)
    if (result.state === 'error')
      return toast.error(result.error ?? 'Failed to verify eligiblity')

    toast.success('Eligibility verification successful')
    search({ patientId }, 1, ELIGIBILITY_TABLE_PAGE_SIZE, true)
  }
  const onSelectionChange = (value: string) => {
    form.setValue('isService', value)
    if (value === 'service') form.setValue('cptCodes', ['99214'])
    else form.setValue('serviceTypeCode', '')
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="4" gap="2" mt="4">
        <Box className="col-span-4">
          <PatientSelect patientId={patientId} />
        </Box>
        <Grid className="col-span-4" columns="4" gap="2">
          <PayerSelect insurance={insurance} />
          <MemberIdField />
          <StateAndLocationFilters />
        </Grid>
        <PracticeSelect />
        <ProviderSelect />
        <ServiceDateSelect />
        <Grid className="col-span-4" columns="4">
          <RadioGroup
            field="isService"
            className="my-auto border-none !bg-transparent"
            defaultValue={form.watch('isService')}
            onValueChange={onSelectionChange}
            options={serviceOptions}
          />

          {form.watch('isService') === 'service' ? (
            <ServiceTypeSelect />
          ) : (
            <CptCodeSelect />
          )}
          <Flex justify="end" align="end" className="col-span-2">
            <Button
              size="1"
              highContrast
              disabled={!patientId}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              Check Eligibility
            </Button>
          </Flex>
        </Grid>
      </Grid>
    </FormContainer>
  )
}

export { CheckEligibilityForm }
