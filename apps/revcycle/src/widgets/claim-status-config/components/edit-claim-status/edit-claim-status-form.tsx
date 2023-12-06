import { Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Code } from '@psychplus/codeset'
import { editCodeSet } from '@psychplus/codeset/api.client'
import {
  Form,
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { useClaimDueTo, useStore } from '../../store'

const schema = z.object({
  claimStatusName: validate.requiredString,
  claimStatusDueTo: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

const EditClaimStatusForm = () => {
  const { claimStatusForEdit, clearClaimStatusForEdit, addClaimStatusDiff } =
    useStore((state) => ({
      claimStatusForEdit: state.claimStatusForEdit,
      clearClaimStatusForEdit: state.clearClaimStatusForEdit,
      addClaimStatusDiff: state.addClaimStatusDiff,
    }))

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      claimStatusName: claimStatusForEdit?.name,
      claimStatusDueTo: claimStatusForEdit?.dueTo,
    },
  })

  const claimDueToOptions = useClaimDueTo()

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    if (!claimStatusForEdit) {
      return
    }

    const reqObj: Code = {
      code: claimStatusForEdit.id,
      display: data.claimStatusName,
      attributes: [
        {
          name: 'DueTo',
          value: data.claimStatusDueTo,
        },
      ],
    }

    await editCodeSet(reqObj, 'ClaimStatus', claimStatusForEdit.id)

    addClaimStatusDiff({
      id: claimStatusForEdit.id,
      name: data.claimStatusName,
      dueTo: data.claimStatusDueTo,
    })

    clearClaimStatusForEdit()
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <FormTextInput
          type="text"
          label="Claim Status Name"
          placeholder="Enter claim status name"
          data-testid="edit-claim-status-name-input"
          {...form.register('claimStatusName')}
        />
        <FormSelect
          label="Due To"
          data-testid="edit-claim-status-due-to-select"
          options={claimDueToOptions}
          {...form.register('claimStatusDueTo')}
        />
      </Flex>
      <Flex gap="3" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <FormSubmitButton
          size="2"
          data-testid="edit-claim-status-submit-button"
        >
          Save
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { EditClaimStatusForm }
