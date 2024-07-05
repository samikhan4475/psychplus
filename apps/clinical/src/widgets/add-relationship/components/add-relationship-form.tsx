import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
  FormPhoneNumberInput,
  FormSelect,
  FormTextInput,
} from '@psychplus/form'
import type { PatientRelationship } from '@psychplus/patient'
import { FormContainer, FormSubmitButton } from '@psychplus/ui/form'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_RELATIONSHIP_WIDGET } from '@psychplus/widgets'
import {
  EVENT_RELATIONSHIP_CREATED,
  EVENT_RELATIONSHIP_UPDATED,
  EventType,
} from '@psychplus/widgets/events'
import { PlacesAutocomplete } from '@/components/places-autocomplete'
import { useGooglePlacesContext } from '@/providers'
import {
  createPatientRelationship,
  updatePatientRelationship,
} from '../api.client'
import { useGuardianRelationshipOptions } from '../hooks'
import { schema, SchemaType } from '../schema'
import { useStore } from '../store'
import { MemoizedTable } from './table'

const inputFieldClasses = 'col-span-1 h-7'

interface AddRelationshipProps {
  data?: PatientRelationship
}

const initialData = {
  name: {
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
    title: '',
    suffix: '',
    honors: '',
  },
  isEmergencyContact: false,
  isGuardian: false,
  guardianRelationshipCode: '',
  contactDetails: {
    email: '',
    phoneNumbers: [
      {
        number: '',
        extension: '',
        comment: '',
      },
    ],
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
    isMailingAddressSameAsPrimary: true,
  },
  isAllowedToReleaseInformation: false,
}

const AddRelationshipForm = ({ data }: AddRelationshipProps) => {
  const { publish } = usePubsub()
  const patient = useStore((state) => state.patient)
  const { loaded } = useGooglePlacesContext()
  const tableData: PatientRelationship[] = useMemo(
    () => (data ? [data] : [initialData]),
    [data],
  )
  const guardianRelationshipOptions = useGuardianRelationshipOptions()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: data
      ? data
      : {
          patientId: patient?.id,
          ...initialData,
        },
  })

  const onCreateNew: SubmitHandler<SchemaType> = (data) => {
    if (patient)
      createPatientRelationship(data, patient.id).then(() => {
        publish(`${ADD_RELATIONSHIP_WIDGET}:${EventType.Closed}`)
        publish(EVENT_RELATIONSHIP_CREATED)
      })
  }

  const onUpdate: SubmitHandler<SchemaType> = (data) => {
    if (data.id && data)
      updatePatientRelationship(data.patientId, data.id, data).then(() => {
        publish(`${ADD_RELATIONSHIP_WIDGET}:${EventType.Closed}`)
        publish(EVENT_RELATIONSHIP_UPDATED)
      })
  }

  return (
    <FormContainer form={form} onSubmit={data ? onUpdate : onCreateNew}>
      <Grid columns="12" rows="3" className="min-w-[648px] gap-3">
        <Box className="col-span-4">
          <FormSelect
            label="Relationship"
            required
            {...form.register('guardianRelationshipCode')}
            options={guardianRelationshipOptions}
            buttonClassName={inputFieldClasses}
          />
        </Box>
        <Box className="col-span-4">
          <FormTextInput
            label="First Name"
            required
            {...form.register('name.firstName')}
            className={inputFieldClasses}
          />
        </Box>
        <Box className="col-span-4">
          <FormTextInput
            label="Middle Name"
            {...form.register('name.middleName')}
            className={inputFieldClasses}
          />
        </Box>
        <Box className="col-span-4">
          <FormTextInput
            label="Last Name"
            required
            {...form.register('name.lastName')}
            className={inputFieldClasses}
          />
        </Box>
        <Box className="col-span-4">
          <FormPhoneNumberInput
            label="Phone Number"
            required
            {...form.register('contactDetails.phoneNumbers.0.number')}
            className={inputFieldClasses}
          />
        </Box>
        <Box className="col-span-4">
          <FormTextInput
            label="Email"
            required
            {...form.register('contactDetails.email')}
            className={inputFieldClasses}
          />
        </Box>
        <Box className="col-span-3">
          <FormTextInput
            label="Zip Code"
            required
            {...form.register('contactDetails.addresses.0.postalCode')}
            className={inputFieldClasses}
          />
        </Box>
        <Box className="col-span-9">
          {loaded && (
            <PlacesAutocomplete label='Address' required name={'contactDetails.addresses.0'} />
          )}
        </Box>
      </Grid>
      <MemoizedTable data={tableData} />
      <Flex justify="end" mt="3">
        <FormSubmitButton
          className="cursor-pointer bg-[#151B4A] px-3 py-1.5 text-[14px] text-[#FFF]"
          form={form}
        >
          Save
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { AddRelationshipForm }
