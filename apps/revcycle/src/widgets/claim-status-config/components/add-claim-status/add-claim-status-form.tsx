import { Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
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
import { CLAIM_STATUS_DUE_TO_OPTIONS } from '../../constants'
import { useAddClaimStatus } from './hooks'

const schema = z.object({
  claimStatusName: validate.requiredString,
  claimStatusDueTo: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

const AddClaimStatusForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      claimStatusName: undefined,
      claimStatusDueTo: undefined,
    },
  })

  const { closeDialog } = useAddClaimStatus()

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    // TODO: api to add claim status
    await new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })

    closeDialog()
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <FormTextInput
          type="text"
          label="Claim Status Name"
          placeholder="Enter claim status name"
          data-testid="add-claim-status-name-input"
          {...form.register('claimStatusName')}
        />
        <FormSelect
          label="Due To"
          data-testid="add-claim-status-due-to-select"
          options={CLAIM_STATUS_DUE_TO_OPTIONS}
          {...form.register('claimStatusDueTo')}
        />
      </Flex>
      <Flex gap="3" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <FormSubmitButton size="2" data-testid="add-claim-status-submit-button">
          Save
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { AddClaimStatusForm }
