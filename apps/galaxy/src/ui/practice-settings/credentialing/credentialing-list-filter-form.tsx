'use client'

import { FormContainer } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Grid, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { LicenseManagerSelect } from './license-manager-select'

const schema = z.object({
  licenseManager: z.string().optional()
})

type SchemaType = z.infer<typeof schema>

const CredentialingListFilterForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      licenseManager: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
  }

  return (
    <FormContainer
      className="flex flex-wrap gap-4 px-2 py-1"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="12" gap="5" className="flex items-center">
        <Text weight="bold" size="2">License Manager</Text>
        <LicenseManagerSelect />
      </Grid>
    </FormContainer>
  )
}

export { CredentialingListFilterForm, type SchemaType }
