'use client'

import { memo, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AuthAndEligibilityTab } from '../auth-and-eligibility-tab'
import { InsurancePolicyPriority } from '../constants'
import { PhotoCards } from '../photo-cards'
import { Insurance, InsuranceParams, InsurancePayer } from '../types'
import { getInsuranceFormDefaultValues, getMinMaxDates } from '../utils'
import { Address1Input } from './address1-input'
import { Address2Input } from './address2-input'
import { CitySelect } from './city-select'
import { DOBDatePicker } from './dob-date-picker'
import { EffectiveDatePicker } from './effective-date-picker'
import { FirstNameInput } from './first-name-input'
import { FormHeader } from './form-header'
import { GenderSelect } from './gender-select'
import { GroupNumberInput } from './group-number-input'
import InsuranceHolderSwitch from './insurance-holder-switch'
import { InsurancePlanSelect } from './insurance-plan-select'
import InsuranceSwitch from './insurance-switch'
import { LastNameInput } from './last-name-input'
import { MemberIDInput } from './member-id-input'
import { PayerSelect } from './payer-select'
import { PolicyNumberInput } from './policy-number-input'
import { PrioritySelect } from './priority-select'
import { RelationshipSelect } from './relationship-select'
import { insuranceSchema, InsuranceSchemaType } from './schema'
import { SSNInput } from './ssn-input'
import { StateSelect } from './state-select'
import { TerminationDatePicker } from './termination-date-picker'
import { ZipInput } from './zip-input'

interface InsuranceFormProps {
  insurancePayers: InsurancePayer[]
  insurancePriority?: InsurancePolicyPriority
  insurance?: Insurance
}

const InsuranceForm = memo(
  ({ insurancePayers, insurance, insurancePriority }: InsuranceFormProps) => {
    const form = useForm<InsuranceSchemaType>({
      reValidateMode: 'onChange',
      criteriaMode: 'all',
      resolver: zodResolver(insuranceSchema),
      defaultValues: getInsuranceFormDefaultValues(insurance),
    })

    const { reset } = form

    const { minDate, maxDate } = getMinMaxDates()

    useEffect(() => {
      if (insurance) {
        reset(getInsuranceFormDefaultValues(insurance))
      } else {
        reset({
          ...getInsuranceFormDefaultValues(),
          isPatientPolicyHolder: true,
        })
      }
    }, [insurance, reset])

    const onSubmit = async (data: InsuranceSchemaType) => {
      const payload: InsuranceParams = {
        id: insurance?.id,
        payerName: data.payerName,
        insurancePlanId: data.insurancePlanId,
        effectiveDate: data.effectiveDate,
        terminationDate: data.terminationDate,
        memberId: data.memberId,
        groupNumber: data.groupNumber,
        isPatientPolicyHolder: data.isPatientPolicyHolder ?? 'Yes',
        insurancePolicyPriority: data.insurancePolicyPriority ?? 'Primary',
        hasCardFrontImage: data.hasCardFrontImage,
        hasCardBackImage: data.hasCardBackImage,
        isActive: true,
      }
      if (!data.isPatientPolicyHolder) {
        payload.policyHolderName = {
          firstName: data?.policyHolderFirstName ?? '',
          lastName: data?.policyHolderLastName ?? '',
        }
        payload.policyHolderGender = data?.policyHolderGender
        payload.policyHolderDateOfBirth = data?.policyHolderDateOfBirth
        payload.policyHolderRelationship = data?.policyHolderRelationship
        payload.policyHolderSocialSecurityNumber =
          data?.policyHolderSocialSecurityNumber
      }

      console.log(payload)
      if (!insurance) delete payload.id
    }

    return (
      <FormContainer form={form} onSubmit={onSubmit}>
        <Grid
          columns="12"
          gap="3"
          p="3"
          className="bg-white relative h-full rounded-1 shadow-2"
        >
          <PhotoCards />
          <Flex className="col-span-8" gap="3" direction="column">
            <FormHeader insurance={insurance} />
            <Grid columns="4" gap="3">
              <InsuranceSwitch />
              <PrioritySelect />
              <PayerSelect insurancePayers={insurancePayers} />
              <InsurancePlanSelect payers={insurancePayers} />
              <PolicyNumberInput />
              <MemberIDInput />
              <GroupNumberInput />
              <EffectiveDatePicker maxDate={maxDate} />
              <TerminationDatePicker minDate={minDate} />
              <Flex className="col-span-full">
                <InsuranceHolderSwitch />
              </Flex>
              <Grid columns="6" className="col-span-full" gap="3">
                <FirstNameInput />
                <LastNameInput />
                <GenderSelect />
                <DOBDatePicker />
                <SSNInput />
                <RelationshipSelect />
              </Grid>
              <Grid columns="5" className="col-span-full" gap="3">
                <Address1Input />
                <Address2Input />
                <CitySelect />
                <StateSelect />
                <ZipInput />
              </Grid>
            </Grid>
          </Flex>
          <AuthAndEligibilityTab />
        </Grid>
      </FormContainer>
    )
  },
)

export { InsuranceForm }
