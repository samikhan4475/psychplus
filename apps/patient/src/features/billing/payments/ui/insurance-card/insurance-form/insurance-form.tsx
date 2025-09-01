'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ActionErrorState, ActionSuccessState } from '@psychplus-v2/api'
import { FormHeading, ToggleableForm } from '@/components-v2'
import {
  InsurancePayer,
  InsurancePolicy,
} from '@/features/billing/payments/types'
import { useToast } from '@/providers'
import { useStore } from '@/widgets/schedule-appointment-list/store'
import { deleteInsurance, updateInsuranceAction } from '../../../actions'
import {
  addInsuranceAction,
  InsuranceParams,
} from '../../../actions/add-insurance'
import { InsuranceSchemaType } from '../schema'
import InsuranceCardUpload from './card-upload'
import InsuranceDetailsWrapper from './details-wrapper'
import { useCardUpload } from './hooks/use-card-upload'
import { useInsuranceFormLogic } from './hooks/use-insurance'
import InsurancePrioritySelect from './priority-select'

interface InsuranceFormProps {
  insurancePayers: InsurancePayer[]
  insurance?: InsurancePolicy
  trigger?: React.ReactNode
  onFormClose?: () => void
  isReadOnly?: boolean
  formHeading?: string
  isList?: boolean
  isCall?: boolean
  isUnAuthenticated?: boolean
}

const createInsurancePayload = (
  data: InsuranceSchemaType,
  insurance?: InsurancePolicy,
): InsuranceParams => {
  const payload: InsuranceParams = {
    id: insurance?.id,
    payerName: data.payerName ?? '',
    insurancePlanId: data.insurancePlanId ?? '',
    effectiveDate: data.effectiveDate ?? '',
    terminationDate: data.terminationDate ?? '',
    memberId: data.memberId ?? '',
    groupNumber: data.groupNumber ?? '',
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

  if (!insurance) delete payload.id

  return payload
}

const InsuranceForm = ({
  insurancePayers,
  insurance,
  trigger,
  onFormClose,
  isReadOnly = false,
  formHeading,
  isList = false,
  isCall = false,
  isUnAuthenticated = false,
}: InsuranceFormProps) => {
  const searchParams = useSearchParams()
  const shortUrlReference = searchParams.get('reference')
  const { toast } = useToast()
  const router = useRouter()
  const { accessToken } = useStore()

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  const { form, watchisPatientPolicyHolder, hasChanges, onCheckedChange } =
    useInsuranceFormLogic(insurance)

  const { setCardFrontImage, setCardBackImage, uploadCards } = useCardUpload()

  const onSubmit = async (data: InsuranceSchemaType) => {
    if (!hasChanges() && !isCall) {
      onFormClose?.()
      return { state: 'success' } as ActionSuccessState
    }

    const payload = createInsurancePayload(data, insurance)
    const verificationStatus = insurance
      ? insurance?.verificationStatus
      : 'Pending'

    const insuranceResponse = insurance
      ? await updateInsuranceAction({ ...payload, verificationStatus })
      : await addInsuranceAction(
          payload,
          headers,
          isUnAuthenticated,
          shortUrlReference as string,
        )

    if (insuranceResponse.state === 'error') {
      if (isList) {
        toast({
          title: insuranceResponse.error,
          type: 'error',
        })
      }
      return {
        state: 'error',
        error: insuranceResponse.error,
      } as ActionErrorState
    }
    if (isList) {
      onSuccess()
      toast({
        title: 'Insurance Updated',
        type: 'success',
      })
    }

    const cardUploadSuccess = await uploadCards(
      insuranceResponse.data.id,
      isUnAuthenticated,
      shortUrlReference as string,
    )

    if (!cardUploadSuccess) {
      return {
        state: 'error',
        error:
          'Could not upload insurance card images. Please try again later.',
      } as ActionErrorState
    }

    return {
      state: 'success',
    } as ActionSuccessState
  }

  const onSuccess = () => {
    router.refresh()
    onFormClose?.()
  }

  const onDeleteAction = () => deleteInsurance({ id: insurance?.id })

  if (isList) {
    return (
      <InsurancePrioritySelect
        insurance={insurance}
        form={form}
        onSubmit={onSubmit}
      />
    )
  }

  return (
    <ToggleableForm
      isCall={isCall}
      form={form}
      onSuccess={onSuccess}
      trigger={trigger}
      submitAction={onSubmit}
      noResetValues
      onFormClose={onFormClose}
      toastData={{
        title: `Insurance ${insurance ? 'Updated' : 'Added'}`,
      }}
      deleteButtonProps={
        insurance
          ? {
              deleteAction: onDeleteAction,
              confirmTitle: 'Remove Insurance',
              confirmDescription:
                'Are you sure you want to remove this insurance?',
              confirmActionLabel: 'Remove',
              toastTitle: 'Insurance Removed',
              onSuccess: router.refresh,
            }
          : undefined
      }
    >
      {!isCall && <FormHeading title={formHeading ?? 'Add Insurance'} />}

      <InsuranceCardUpload
        insurance={insurance}
        form={form}
        isReadOnly={isReadOnly}
        isCall={isCall}
        onCardFrontImageChange={setCardFrontImage}
        onCardBackImageChange={setCardBackImage}
      />

      <InsuranceDetailsWrapper
        insurancePayers={insurancePayers}
        isReadOnly={isReadOnly}
        isCall={isCall}
        form={form}
        watchisPatientPolicyHolder={watchisPatientPolicyHolder}
        onCheckedChange={onCheckedChange}
      />
    </ToggleableForm>
  )
}

export { InsuranceForm }
