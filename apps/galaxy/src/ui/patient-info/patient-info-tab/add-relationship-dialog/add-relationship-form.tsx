'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, FormError } from '@/components'
import { useGooglePlacesContext } from '@/providers/google-places-provider'
import { addPatientRelationshipAction } from '../actions'
import { usePatientRelationshipContext } from '../relationship/context'
import { addRelationshipTransformOut } from '../transform'
import { AddressInput } from './address-input'
import { EmailInput } from './email-input'
import { FirstNameInput } from './first-name-input'
import { LastNameInput } from './last-name-input'
import { MaidentNameInput } from './maiden-name-input'
import { MiddleNameInput } from './middle-name-input'
import { PhoneNumberInput } from './phone-number-input'
import { RelationshipBlock } from './relationship-block'
import { RelationshipSelect } from './relationship-select'
import { SaveButton } from './save-button'
import { AddRelationshipSchemaType, schema } from './schema'
import { ZipInput } from './zip-input'

interface AddRelationshipFormProps {
  patientId: string
  setDialogOpen: (value: boolean) => void
}

const AddRelationshipForm = ({
  patientId,
  setDialogOpen,
}: AddRelationshipFormProps) => {
  const { loaded } = useGooglePlacesContext()
  const { setRelationships, setLoading } = usePatientRelationshipContext()
  const form = useForm<AddRelationshipSchemaType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      maidenName: '',
      middleName: '',
      phone: '',
      relationship: '',
      isEmergencyContact: false,
      isAllowedToReleaseInformation: false,
      isGuardian: false,
      contactDetails: {
        addresses: [
          {
            type: 'Home',
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
          },
        ],
      },
    },
  })

  const [error, setError] = useState<string>()
  const onSubmit: SubmitHandler<AddRelationshipSchemaType> = async (data) => {
    setError(undefined)
    setLoading(true)
    const result = await addPatientRelationshipAction(
      patientId,
      addRelationshipTransformOut(patientId, data),
    )
    if (result.state === 'error') {
      setError(result.error)
      setLoading(false)
      return
    }
    setRelationships((relationships) => [result?.data, ...relationships])
    toast.success('Relationship added successfully')
    form.reset()
    setDialogOpen(false)
    setLoading(false)
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <FormError message={error} />
      <Grid gap="2" columns="3">
        <RelationshipSelect />
        <FirstNameInput />
        <MiddleNameInput />
        <Flex gap="2" className="col-span-full">
          <LastNameInput />
          <MaidentNameInput />
          <PhoneNumberInput />
          <EmailInput />
        </Flex>
        <ZipInput />
        {loaded && <AddressInput />}
        <RelationshipBlock />
      </Grid>
      <SaveButton />
    </FormContainer>
  )
}

export { AddRelationshipForm, type AddRelationshipSchemaType }
