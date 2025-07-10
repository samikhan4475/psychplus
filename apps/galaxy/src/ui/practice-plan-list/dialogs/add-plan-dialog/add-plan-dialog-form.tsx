import React from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, TextField } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  AsyncAutoCompleteTextField,
  CodesetSelect,
  DatePickerInput,
  DropdownSelect,
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { SelectOptionType } from '@/types'
import { formatDateToISOString, getLocalCalendarDate } from '@/utils'
import { addPayerPlanAction, updatePayerPlanAction } from '../../actions'
import { useStore } from '../../store'
import { InsurancePlanItem, SelectPayerOption } from '../../types'
import { getPayerPlanAction } from '../actions'
import { schema, SchemaType } from './schema'

const networkStatusOptions = [
  { label: 'IN', value: 'InNetwork' },
  { label: 'OON', value: 'OutOfNetwork' },
]
const revalidationOptions = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
]

interface AddPlanDialogFormProps {
  onCloseModal: (open: boolean) => void
  plan?: InsurancePlanItem
}

const AddPlanDialogForm = ({ onCloseModal, plan }: AddPlanDialogFormProps) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const { id: practiceId } = useParams<{
    id: string
  }>()
  const planStatus = (() => {
    if (plan?.id) {
      return plan.planStatus ? 'Active' : 'Inactive'
    }
    return ''
  })()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: plan?.id ?? '',
      insurancePlanId: plan?.insurancePlanId ?? '',
      insurancePlanName: plan?.insurancePlanName ?? '',
      payerName: plan?.payerName ?? '',
      planStatus,
      planType: plan?.planType ?? '',
      recordStatus: plan?.recordStatus ?? 'Active',
      networkStatus: plan?.networkStatus ?? '',
      effectiveDate: plan?.effectiveDate
        ? getLocalCalendarDate(plan.effectiveDate)
        : undefined,
      revalidationDate: plan?.revalidationDate
        ? getLocalCalendarDate(plan.revalidationDate)
        : undefined,
      isProviderRevalidationRequired: plan?.isProviderRevalidationRequired
        ? 'true'
        : '',
      isRevalidationRequired: plan?.isRevalidationRequired ? 'true' : '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const {
      isRevalidationRequired,
      isProviderRevalidationRequired,
      revalidationDate,
      effectiveDate,
      planStatus,
    } = data
    const finalizedModel = {
      ...data,
      planStatus: planStatus === 'Active',
      isRevalidationRequired: isRevalidationRequired === 'true',
      isProviderRevalidationRequired: isProviderRevalidationRequired === 'true',
      effectiveDate: effectiveDate
        ? formatDateToISOString(effectiveDate)
        : undefined,
      practiceId,
      revalidationDate: revalidationDate
        ? formatDateToISOString(revalidationDate)
        : undefined,
    }

    if (!finalizedModel.id) delete finalizedModel.id

    const payerPlanAction = data.id ? updatePayerPlanAction : addPayerPlanAction

    const result = await payerPlanAction(finalizedModel)
    if (result.state === 'error') return toast.error(result.error ?? `Failed to ${data.id ? 'add': 'update'} payer plan.`)

    toast.success('Plan created successfully')
    onCloseModal(false)
    search({ practiceId }, 1, true)
  }

  const onPlanSelect = (option: SelectOptionType | SelectPayerOption) => {
    if (
      'payerName' in option &&
      'payerType' in option &&
      'payerId' in option &&
      'planStatus' in option
    ) {
      const { value, label, planStatus, payerName, payerType } = option

      form.setValue('insurancePlanId', value)
      form.setValue('planStatus', planStatus ? 'Active' : 'Inactive')
      form.setValue('insurancePlanName', label)
      form.setValue('payerName', payerName)
      form.setValue('planType', payerType)
    }
  }
  return (
    <FormContainer className="gap-2" form={form} onSubmit={onSubmit}>
      <FormFieldContainer className="w-full gap-1">
        <FormFieldLabel required className="!text-1">
          Insurance Plan Name
        </FormFieldLabel>
        <AsyncAutoCompleteTextField
          disabled={!!form.getValues('id')}
          fetchDataAction={getPayerPlanAction}
          field="insurancePlanName"
          placeholder="Search"
          onSelect={onPlanSelect}
          valueKey="value"
          className="h-5 w-full"
          truncateText={25}
        />
        <FormFieldError name="insurancePlanId" />
      </FormFieldContainer>
      <Grid columns="2" gap="2">
        <FormFieldContainer className="gap-1">
          <FormFieldLabel required>Payer Name</FormFieldLabel>
          <TextField.Root
            size="1"
            disabled
            className="border-pp-gray-2 h-5 border border-solid !outline-none [box-shadow:none]"
            {...form.register('payerName')}
            placeholder=""
          />
          <FormFieldError name="payerName" />
        </FormFieldContainer>
        <FormFieldContainer className="gap-1">
          <FormFieldLabel required>Payer Type</FormFieldLabel>
          <TextField.Root
            disabled
            size="1"
            className="border-pp-gray-2 h-5 border border-solid !outline-none [box-shadow:none]"
            {...form.register('planType')}
            placeholder=""
          />
          <FormFieldError name="planType" />
        </FormFieldContainer>
        <FormFieldContainer className=" gap-1">
          <FormFieldLabel required>Effective Date</FormFieldLabel>
          <DatePickerInput field="effectiveDate" />
        </FormFieldContainer>
        <FormFieldContainer className=" gap-1">
          <FormFieldLabel required>Re-valid/cred Date Req.</FormFieldLabel>
          <DropdownSelect
            options={revalidationOptions}
            field="isRevalidationRequired"
          />
          <FormFieldError name="isRevalidationRequired" />
        </FormFieldContainer>
        <FormFieldContainer className="gap-1">
          <FormFieldLabel required>Re-valid/cred Date</FormFieldLabel>
          <DatePickerInput field="revalidationDate" />
        </FormFieldContainer>
        <FormFieldContainer className=" gap-1">
          <FormFieldLabel required>Provider Revalidation Req.</FormFieldLabel>
          <DropdownSelect
            options={revalidationOptions}
            field="isProviderRevalidationRequired"
          />
          <FormFieldError name="isProviderRevalidationRequired" />
        </FormFieldContainer>
        <FormFieldContainer className="gap-1">
          <FormFieldLabel required>Plan Status</FormFieldLabel>
          <CodesetSelect
            size="1"
            name="planStatus"
            placeholder="Select"
            disabled
            exclude={['Deleted', 'Archived']}
            codeset={CODESETS.RecordStatus}
          />
          <FormFieldError name="planStatus" />
        </FormFieldContainer>
        <FormFieldContainer className=" gap-1">
          <FormFieldLabel required>Network Status</FormFieldLabel>
          <DropdownSelect
            options={networkStatusOptions}
            field="networkStatus"
          />
          <FormFieldError name="networkStatus" />
        </FormFieldContainer>
      </Grid>
      <Button
        loading={form.formState.isSubmitting}
        type="submit"
        className="ml-auto w-fit"
        size="1"
        highContrast
      >
        <SaveIcon width={15} height={15} strokeWidth={1.75} />
        Save
      </Button>
    </FormContainer>
  )
}

export { AddPlanDialogForm, type SchemaType }
