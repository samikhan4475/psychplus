'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer } from '@/components'
import {
  aaDisplayNameValidation,
  namespaceValidation,
  oidValidation,
} from '@/ui/assigning-authorities/form-validations'
import { addAssigningAuthority } from '../../actions'
import { useStore } from '../../store'
import { DisplayNameInput, NamespaceInput, OidInput } from './form-fields'

const schema = z.object({
  displayName: aaDisplayNameValidation,
  namespace: namespaceValidation,
  oid: oidValidation,
})

type SchemaType = z.infer<typeof schema>

interface AddAssigningAuthorityFormProps {
  onClose: () => void
}

const AddAssigningAuthorityForm = ({
  onClose,
}: AddAssigningAuthorityFormProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      oid: '',
      displayName: '',
      namespace: '',
    },
  })
  const [loading, setLoading] = useState<boolean>(false)
  const { assigningAuthorities, setAssigningAuthorities } = useStore()

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setLoading(true)

    const response = await addAssigningAuthority(data)
    setLoading(false)

    if (response.state === 'error')
      return toast.error(
        response.error ?? 'Error while saving new assigning authority',
      )

    toast.success('Saved')
    setAssigningAuthorities([response.data, ...assigningAuthorities])
    onClose()
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="gap-3">
      <Grid columns="2" gap="2">
        <DisplayNameInput disabled={loading} />
        <NamespaceInput disabled={loading} />
      </Grid>
      <Grid columns="2" gap="2">
        <OidInput disabled={loading} />
      </Grid>
      <Flex justify="end">
        <Button highContrast size="2" type="submit" disabled={loading}>
          Save
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { AddAssigningAuthorityForm, type SchemaType }
