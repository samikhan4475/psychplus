import { Flex, Text } from '@radix-ui/themes'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { FormSubmitButton } from '@/components'
import { ProviderSchemaType } from '../schema'
import { SelectedPatientsDropdown } from './patients-dropdown'
import { ProvidersDropdown } from './providers-dropdown'

const ChangeProviderForm = ({
  providerType,
  staffId,
  onSubmit,
}: {
  providerType: string
  staffId: string
  onSubmit: SubmitHandler<ProviderSchemaType>
}) => {
  const form = useFormContext<ProviderSchemaType>()

  return (
    <Flex direction="column" gap="3">
      <ProvidersDropdown providerType={providerType} staffId={staffId} />
      <SelectedPatientsDropdown />
      <FormSubmitButton
        form={form}
        onClick={form.handleSubmit(onSubmit)}
        highContrast
        className="mt-3 self-end"
        loading={form.formState.isSubmitting}
      >
        <Text size="1">Save</Text>
      </FormSubmitButton>
    </Flex>
  )
}

export { ChangeProviderForm }
