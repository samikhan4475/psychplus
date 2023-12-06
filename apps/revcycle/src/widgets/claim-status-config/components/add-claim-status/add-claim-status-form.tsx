import { Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Code } from '@psychplus/codeset'
import { addCodeSet } from '@psychplus/codeset/api.client'
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
import { useClaimDueTo } from '../../store'
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

  const claimDueToOptions = useClaimDueTo()

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const reqObj: Code = {
      code: 'x',
      display: data.claimStatusName,
      attributes: [
        {
          name: 'DueTo',
          value: data.claimStatusDueTo,
        },
        {
          name: 'IsActive',
          value: 'True',
        },
        {
          name: 'IsDeleted',
          value: 'False',
        },
      ],
    }
    const res = await addCodeSet(reqObj, 'ClaimStatus')
    console.log('addCodeSet', res)

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
        <FormSubmitButton size="2" data-testid="add-claim-status-submit-button">
          Save
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { AddClaimStatusForm }
