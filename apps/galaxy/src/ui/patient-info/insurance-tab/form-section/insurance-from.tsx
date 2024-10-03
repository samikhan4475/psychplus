'use client'

import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AddressFieldsGroup, FormContainer } from '@/components'
import { Insurance, InsurancePayer } from '@/types'
import {
  addPolicyAction,
  updatePolicyAction,
  uploadPolicyImage,
} from '../actions'
import { AuthAndEligibilityTab } from '../auth-and-eligibility-tab'
import { ImageCard } from '../shared'
import { useStore } from '../store'
import { transformOut } from '../transform'
import {
  getInsuranceFormDefaultValues,
  getMinMaxDates,
  registerPolicyHolderFields,
  unregisterPolicyHolderFields,
} from '../utils'
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
import { PrioritySelect } from './priority-select'
import { RelationshipSelect } from './relationship-select'
import { insuranceSchema, InsuranceSchemaType } from './schema'
import { SSNInput } from './ssn-input'
import { TerminationDatePicker } from './termination-date-picker'

interface InsuranceFormProps {
  insurancePayers: InsurancePayer[]
  insurance?: Insurance
  patientId: string
  onFormClose?: () => void
}

const InsuranceForm = memo(
  ({
    insurancePayers,
    insurance,
    patientId,
    onFormClose,
  }: InsuranceFormProps) => {
    const router = useRouter()
    const { isAddFormOpen, setAddFormOpen } = useStore((state) => ({
      isAddFormOpen: state.isAddFormOpen,
      setAddFormOpen: state.setAddFormOpen,
    }))

    const [policyFrontImage, setPolicyFrontImage] = useState<File | undefined>(
      undefined,
    )
    const [policyBackImage, setPolicyBackImage] = useState<File | undefined>(
      undefined,
    )

    const [maxDate, setMaxDate] = useState<string>('')
    const [minDate, setMinDate] = useState<string>('')

    useEffect(() => {
      const { maxDate, minDate } = getMinMaxDates()

      setMaxDate(maxDate)

      setMinDate(minDate)
    }, [])

    const form = useForm<InsuranceSchemaType>({
      reValidateMode: 'onChange',
      criteriaMode: 'all',
      resolver: zodResolver(insuranceSchema),
      defaultValues: getInsuranceFormDefaultValues(insurance),
    })

    const {
      register,
      watch,
      unregister,
      reset,
      formState: { isSubmitting },
    } = form
    const watchisPatientPolicyHolder = watch('isPatientPolicyHolder')

    useEffect(() => {
      if (!watchisPatientPolicyHolder) {
        registerPolicyHolderFields(register)
      } else {
        unregisterPolicyHolderFields(unregister)
      }
    }, [register, unregister, watchisPatientPolicyHolder])

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
      const payload = transformOut({ insurance, data })
      if (!insurance) delete payload.id

      const insuranceResponse = insurance
        ? await updatePolicyAction(patientId, insurance.id, payload)
        : await addPolicyAction(patientId, payload)

      if (insuranceResponse.state === 'error') {
        toast.error(
          insuranceResponse.error ??
            'There was a problem saving your changes. Please try again.',
        )
        return
      }

      const imageUploadPromises = []

      if (policyFrontImage) {
        imageUploadPromises.push(
          uploadPolicyImage({
            file: policyFrontImage,
            patientId: patientId,
            side: 'Front',
            policyId: insuranceResponse.data.id,
          }),
        )
      }

      if (policyBackImage) {
        imageUploadPromises.push(
          uploadPolicyImage({
            file: policyBackImage,
            patientId: patientId,
            side: 'Back',
            policyId: insuranceResponse.data.id,
          }),
        )
      }
      const imageUploadResponse = await Promise.all(imageUploadPromises)

      if (imageUploadResponse.some((r) => !r.ok)) {
        toast.error(
          'Could not upload insurance card images Please try again later.',
        )
        return
      }
      toast.success(
        insurance ? 'Policy updated successfully' : 'Policy added successfully',
      )

      return onSuccess()
    }

    const onSuccess = () => {
      router.refresh()

      if (!insurance && isAddFormOpen) {
        setAddFormOpen(false)
      }
      onFormClose?.()
    }

    return (
      <FormContainer form={form} onSubmit={onSubmit} className="px-[1px]">
        <Grid
          columns="12"
          gap="3"
          p="3"
          className="bg-white relative h-full rounded-1 shadow-2"
        >
          <Flex gap="3" className="col-span-4">
            <ImageCard
              title="Insurance Photo Front"
              savedImg={
                insurance && form.watch('hasCardFrontImage')
                  ? `/ehr/api/patients/${patientId}/policies/${insurance.id}/cardimage/front`
                  : undefined
              }
              onImageChanged={(image) => {
                form.setValue(
                  'hasCardFrontImage',
                  !form.getValues('hasCardFrontImage'),
                )
                setPolicyFrontImage(image)
              }}
            />

            <ImageCard
              title="Insurance Photo Back"
              savedImg={
                insurance && form.watch('hasCardBackImage')
                  ? `/ehr/api/patients/${patientId}/policies/${insurance.id}/cardimage/back`
                  : undefined
              }
              onImageChanged={(image) => {
                form.setValue(
                  'hasCardBackImage',
                  !form.getValues('hasCardBackImage'),
                )
                setPolicyBackImage(image)
              }}
            />
          </Flex>
          <Flex className="col-span-8" gap="3" direction="column">
            <FormHeader
              insurance={insurance}
              patientId={patientId}
              disabled={isSubmitting}
            />
            <Grid columns="4" gap="3">
              <InsuranceSwitch />
              <PrioritySelect />
              <PayerSelect insurancePayers={insurancePayers} />
              <InsurancePlanSelect payers={insurancePayers} />

              <MemberIDInput />
              <GroupNumberInput />
              <EffectiveDatePicker maxDate={maxDate} />
              <TerminationDatePicker minDate={minDate} />
              <Flex className="col-span-full">
                <InsuranceHolderSwitch />
              </Flex>

              {!watchisPatientPolicyHolder ? (
                <>
                  <Grid columns="6" className="col-span-full" gap="3">
                    <FirstNameInput />
                    <LastNameInput />
                    <GenderSelect />
                    <DOBDatePicker />
                    <SSNInput
                      name="policyHolderSocialSecurityNumber"
                      size="2"
                      placeholder="Enter SSN"
                    />
                    <RelationshipSelect />
                  </Grid>

                  <AddressFieldsGroup
                    className="col-span-full flex-row"
                    columnsPerRow="2"
                    fieldClassName="!h-7"
                    fieldLabelClassName="!text-1"
                  />
                </>
              ) : null}
            </Grid>
          </Flex>
          {/* <AuthAndEligibilityTab /> */}
        </Grid>
      </FormContainer>
    )
  },
)

InsuranceForm.displayName = 'InsuranceForm'

export { InsuranceForm }
