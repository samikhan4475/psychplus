'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addAuthority } from '@psychplus/codeset/api.client'
import { FormSubmitButton, validate } from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { useToast } from '@psychplus/ui/toast-provider'
import { AssigningAuthoritiesTable, FilterForm } from './components'
import { getDuplicateErrorFields } from './components/utils'
import { useStore } from './store'

const schema = z.object({
  displayName: validate.requiredString,
  namespace: validate.requiredString,
  oid: validate.requiredString,
  viewPermissionCode: validate.optionalString,
  editPermissionCode: validate.optionalString,
})

export type SchemaType = z.infer<typeof schema>

const AssigningAuthoritiesWidgetClient = () => {
  const {
    setNewAssigningAuthority,
    newAssigningAuthority,
    setAssigningAuthorities,
    assigningAuthorities,
  } = useStore((state) => ({
    setNewAssigningAuthority: state.setNewAssigningAuthority,
    newAssigningAuthority: state.newAssigningAuthority,
    setAssigningAuthorities: state.setAssigningAuthorities,
    assigningAuthorities: state.assigningAuthorities,
  }))

  const { toast } = useToast()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: SchemaType) => {
    try {
      const res = await addAuthority(data)
      setAssigningAuthorities([...assigningAuthorities, res])
      setNewAssigningAuthority()
      form.reset()
      toast({ type: 'success', title: 'Assigning Authority Added' })
    } catch (err: unknown) {
      const { status, message } = err as { status?: number; message?: string }
      let errorMessage = message ?? ''
      if (status && status === 409) {
        
        const { fields: errorFields, message } = getDuplicateErrorFields(
          errorMessage,
          data,
        )
        errorMessage = message ?? 'Duplicate assigning authority found!'

        errorFields.forEach((field) => {
          form.setError(field, {
            type: 'manual',
            message: errorMessage,
          })
        })
      }
      if (err instanceof Error) {
        toast({ type: 'error', title: errorMessage || err.message })
      } else {
        toast({
          type: 'error',
          title: errorMessage || (err as { message: string }).message,
        })
      }
    }
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" className="h-fit min-w-fit bg-[#f0f4ff]" p="3">
        <Flex justify="between" align="center" className="h-9 bg-[#FFFFFF] p-2">
          <Text className="text-5" weight="bold">
            Assigning Authorities
          </Text>
          <Flex>
            {newAssigningAuthority === null ? (
              <Button
                className="bg-[#151B4A]"
                size="2"
                onClick={setNewAssigningAuthority}
              >
                <PlusIcon />
                Assigning Authorities
              </Button>
            ) : (
              <Flex gap="2">
                <Button
                  size="2"
                  variant="outline"
                  color="red"
                  onClick={(e) => {
                    setNewAssigningAuthority()
                    form.reset()
                  }}
                  highContrast
                >
                  Cancel
                </Button>
                <FormSubmitButton size="2" highContrast variant="outline">
                  Save
                </FormSubmitButton>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex my="2">
          <FilterForm />
        </Flex>

        <AssigningAuthoritiesTable form={form} />
      </Flex>
    </FormContainer>
  )
}

export { AssigningAuthoritiesWidgetClient }
