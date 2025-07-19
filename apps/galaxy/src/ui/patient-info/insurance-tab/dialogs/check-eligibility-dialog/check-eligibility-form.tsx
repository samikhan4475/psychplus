import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import {
  AsyncSelect,
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  RadioGroup,
} from '@/components'
import { getPayersListAction } from '@/ui/payer/actions'
import { SearchProcedureCodes } from '@/ui/revenue-cycle/claim-detail-tab/charges-section'
import { LocationSelect } from './location-select'
import { PatientSelect } from './patient-select'
import { PracticeSelect } from './practice-select'
import { ProviderSelect } from './provider-select'
import { schema, SchemaType } from './schema'
import { ServiceDateSelect } from './service-date-select'
import { ServiceTypeSelect } from './service-type-select'

const serviceOptions = [
  { value: 'service', label: 'Service Type' },
  { value: 'cpt', label: 'CPT Code' },
]

const CheckEligibilityForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: '',
      patientInsurancePolicyId: '',
      organizationId: '',
      practiceId: '',
      providerId: '',
      locationId: '',
      isService: 'service',
      serviceDate: null,
      serviceTypeCode: '',
      cptCodes: [],
    },
  })

  const onSubmit = (data: SchemaType) => {
    //API Handling will be done
  }
  const onSelectionChange = (value: string) => {
    form.setValue('isService', value)
    form.setValue('cptCodes', [])
    form.setValue('serviceTypeCode', '')
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="4" gap="2" mt="4">
        <Box className="col-span-4">
          <PatientSelect />
        </Box>
        <Grid className="col-span-4" columns="3" gap="2">
          <FormFieldContainer>
            <FormFieldLabel required>Payer</FormFieldLabel>
            <AsyncSelect
              field="payerId"
              placeholder="Select"
              fetchOptions={getPayersListAction}
              buttonClassName="w-full h-6"
              className="h-full flex-1"
            />
            <FormFieldError name="payerId" />
          </FormFieldContainer>
          <LocationSelect />
          <PracticeSelect />
        </Grid>
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
            <FormFieldContainer>
              <FormFieldLabel required>CPT Code</FormFieldLabel>
              <Box className="rounded-2 border border-gray-5 pr-1">
                <SearchProcedureCodes
                  fieldName="cptCodes"
                  placeholder={form.watch('cptCodes')?.[0] || 'Search'}
                  required
                  onChange={(value) => form.setValue('cptCodes', [value.code])}
                />
              </Box>
            </FormFieldContainer>
          )}
          <Flex justify="end" align="end" className="col-span-2">
            <Button size="1" highContrast>
              Check Eligibility
            </Button>
          </Flex>
        </Grid>
      </Grid>
    </FormContainer>
  )
}

export { CheckEligibilityForm }
