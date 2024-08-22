import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { ActiveCodeSet } from '@psychplus/codeset'
import { addActiveCodeSet } from '@psychplus/codeset/api.client'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form'
import { useToast } from '@psychplus/ui/toast-provider'
import { usePubsub } from '@psychplus/utils/event'
import { EVENT_ACTIVE_CODSET_CREATED } from '@psychplus/widgets/events'
import { FORMATS } from '../utils'

const schema = z.object({
  displayName: validate.requiredString.max(128),
  codeSystemName: validate.requiredString.max(64),
  version: validate.requiredString.max(32),
  sourceDescription: validate.requiredString,
  sourceUrl: validate.requiredString,
  sourceFormat: validate.requiredString,
  sourceRefrence: validate.requiredString,
  validFrom: validate.requiredString,
  validTo: validate.requiredString,
  authorizedGroup: validate.anyString,
})

type SchemaType = z.infer<typeof schema>

type ActiveCodesetsFormrops = {
  data?: ActiveCodeSet
  isEdit?: boolean
  closeDialog: () => void
  authorityId: string
}

const ActiveCodesetsForm = ({
  isEdit,
  authorityId,
  closeDialog,
}: ActiveCodesetsFormrops) => {
  const { toast } = useToast()
  const { publish } = usePubsub()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = async (formData: SchemaType) => {
    try {
      const data = await addActiveCodeSet(authorityId, formData)

      if (!data) return

      closeDialog()
      toast({ type: 'success', title: 'Created' })
      publish(EVENT_ACTIVE_CODSET_CREATED)
    } catch (err: unknown) {
      const { status, message } = err as { status?: number; message?: string }

      let errMsg = message
      if (status === 409) {
        errMsg = 'Duplicate Record'
      }
      toast({ type: 'error', title: errMsg })
    }
  }

  const validFromValue = form.watch('validFrom')

  return (
    <FormContainer onSubmit={handleSubmit} form={form}>
      <Flex className="font-light" gap="2" mt="4">
        <Flex gap="2" className="flex-1">
          <Box className="w-full">
            <FormTextInput
              label="Name"
              placeholder="Type Code System Name"
              {...form.register('codeSystemName')}
            />
          </Box>
        </Flex>
        <Flex className="flex-1">
          <Box className="w-full">
            <FormTextInput
              label="Display Name"
              placeholder="Write Display Name"
              {...form.register('displayName')}
            />
          </Box>
        </Flex>
      </Flex>

      <Flex className="font-light" gap="2" mt="4">
        <Flex gap="2" className="flex-1">
          <Box className="flex-1">
            <FormTextInput
              label="Version"
              placeholder="Type Version"
              {...form.register('version')}
            />
          </Box>
          <Box className="flex-1">
            <FormTextInput
              label="Source Description"
              placeholder="Write Description"
              {...form.register('sourceDescription')}
            />
          </Box>
        </Flex>
        <Flex className="flex-1">
          <Box className="w-full">
            <FormTextInput
              label="Source URL"
              placeholder="Type Source URL"
              {...form.register('sourceUrl')}
            />
          </Box>
        </Flex>
      </Flex>

      <Flex className="font-light" gap="2" mt="4">
        <Flex gap="2" className="flex-1">
          <Box className="w-full">
            <FormSelect
              label="Source Format"
              placeholder="Type Source Format"
              {...form.register('sourceFormat')}
              options={FORMATS}
            />
          </Box>
        </Flex>
        <Flex className="flex-1">
          <Box className="w-full">
            <FormTextInput
              label="Source Reference"
              placeholder="Type Source Reference"
              {...form.register('sourceRefrence')}
            />
          </Box>
        </Flex>
      </Flex>

      <Flex className="font-light" gap="2" mt="4">
        <Flex gap="2" className="flex-1">
          <Box className="flex-1">
            <FormTextInput
              type="date"
              label="Effective"
              name="validFrom"
              max="9999-12-31"
              min={format(new Date(), 'yyyy-MM-dd')}
              value={validFromValue ?? ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const selectedDate = event.target.value
                const [effectiveDate] = new Date(selectedDate)
                  .toISOString()
                  .split('T')
                form.setValue('validFrom', effectiveDate)
                form.setValue('validTo', '')
              }}
              className="mr-4"
            />
          </Box>
          <Box className="flex-1">
            <FormTextInput
              disabled={!validFromValue}
              min={validFromValue}
              type="date"
              label="Deactivate"
              max="9999-12-31"
              {...form.register('validTo')}
              className="mr-4"
            />
          </Box>
        </Flex>
      </Flex>

      <Flex className="mt-9 flex justify-end" gap="2">
        <Button
          className="rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
          size="3"
          type="button"
        >
          Help
        </Button>
        <FormSubmitButton className="rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
          {isEdit ? 'Update' : 'Save'}
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { ActiveCodesetsForm }
