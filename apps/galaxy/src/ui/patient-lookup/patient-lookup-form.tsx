'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, ScrollArea, TextField } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import {
  FormError,
  FormFieldContainer,
  FormFieldLabel,
  FormSubmitButton,
} from '@/components/form'
import { useStore } from './store'

const PATIENT_SEARCH_FORM_NAME_INPUT = 'patient-search-form-name-input'
const PATIENT_SEARCH_FORM_MRN_INPUT = 'patient-search-form-mrn-input'

const schema = z.object({
  name: z.string().trim(),
  mrn: z.string().trim(),
})

type SchemaType = z.infer<typeof schema>

const PatientLookupForm = () => {
  const { error, search } = useStore((state) => ({
    error: state.error,
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      mrn: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    return search(
      {
        name: data.name.trim(),
        mrn: data.mrn.trim(),
      },
      1,
      true,
    )
  }

  return (
    <ScrollArea>
      <Flex direction="column" p="2">
        <FormError message={error} />
        <FormContainer form={form} onSubmit={onSubmit}>
          <Flex direction="column" gap="2" mb="3">
            <FormFieldContainer>
              <FormFieldLabel id={PATIENT_SEARCH_FORM_NAME_INPUT}>
                Name
              </FormFieldLabel>
              <TextField.Root
                size="1"
                id={PATIENT_SEARCH_FORM_NAME_INPUT}
                autoFocus
                {...form.register('name')}
              />
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel id={PATIENT_SEARCH_FORM_MRN_INPUT}>
                MRN
              </FormFieldLabel>
              <TextField.Root
                size="1"
                id={PATIENT_SEARCH_FORM_MRN_INPUT}
                {...form.register('mrn')}
              />
            </FormFieldContainer>
          </Flex>
          <Flex gap="2">
            <FormSubmitButton form={form} size="1" highContrast>
              Search
            </FormSubmitButton>
            <Button
              size="1"
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                form.reset()
              }}
              highContrast
            >
              Reset
            </Button>
          </Flex>
        </FormContainer>
      </Flex>
    </ScrollArea>
  )
}

export { PatientLookupForm, type SchemaType }
