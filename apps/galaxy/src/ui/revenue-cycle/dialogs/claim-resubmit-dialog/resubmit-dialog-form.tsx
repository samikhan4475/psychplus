import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, TextArea } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  CodesetSelect,
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { Claim, InsurancePolicyPriority } from '@/types'
import { claimResubmitAction } from '../../actions'
import { useStore } from '../../claim-tab/store'
import { getExcludedPolicies } from '../../claim-tab/utils'

interface ResubmitDialogFormProps {
  claim: Claim
  onOpen: () => void
}

const schema = z.object({
  claimId: z.string(),
  resubmissionReason: z.string().min(1, { message: 'Required' }),
  insurancePolicyPriority: z.enum([
    InsurancePolicyPriority.Primary,
    InsurancePolicyPriority.Secondary,
  ]),
})

type SchemaType = z.infer<typeof schema>

const ResubmitDialogForm = ({ claim, onOpen }: ResubmitDialogFormProps) => {
  const { claimListSearch, claimListPayload } = useStore((state) => ({
    claimListSearch: state.claimsListSearch,
    claimListPayload: state.claimsListPayload,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      claimId: claim.id,
      resubmissionReason: '',
      insurancePolicyPriority: undefined,
    },
  })
  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const result = await claimResubmitAction(data)

    if (result.state === 'error') {
      toast.error(result.error)
      return
    }
    toast.success('Claim resubmitted successfully')
    claimListSearch(claimListPayload, 1)
    onOpen()
  }

  const excludedOptions = [...getExcludedPolicies(claim), 'Other']
  return (
    <FormContainer className="gap-1.5" form={form} onSubmit={onSubmit}>
      <FormFieldContainer>
        <FormFieldLabel className="!text-1" required>
          Insurance Type
        </FormFieldLabel>
        <CodesetSelect
          name="insurancePolicyPriority"
          codeset={CODESETS.InsurancePolicyPriority}
          exclude={excludedOptions}
          size="1"
          placeholder="Select priority"
        />

        <FormFieldError name="insurancePolicyPriority" />
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel required>Note</FormFieldLabel>
        <TextArea
          className="w-full !outline-none "
          maxLength={2048}
          {...form.register('resubmissionReason')}
        />
        <FormFieldError name="resubmissionReason" />
      </FormFieldContainer>
      <Flex justify="end">
        <Button
          variant="outline"
          highContrast
          className="bg-white mr-2"
          size="2"
          disabled={form.formState.isSubmitting}
          onClick={onOpen}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          type="submit"
          loading={form.formState.isSubmitting}
          size="2"
          highContrast
        >
          Save
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { ResubmitDialogForm }
