import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormSelect, FormTextInput } from '@psychplus/form'
import { FormContainer, FormSubmitButton } from '@psychplus/ui/form'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_RELATIONSHIP_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const schema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  relationship: z.string(),
  address1: z.string(),
  email: z.string(),
  homePhone: z.string(),
  cellPhone: z.string(),
  maidenName: z.string(),
})

type SchemaType = z.infer<typeof schema>

const inputFieldClasses = 'col-span-1 h-7'

const AddRelationshipForm = () => {
  const { publish } = usePubsub()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      relationship: '',
      address1: 'Street test, house test',
      email: '',
      homePhone: '',
      cellPhone: '',
      maidenName: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log('data returned: ', data)
    publish(`${ADD_RELATIONSHIP_WIDGET}:${EventType.Closed}`)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns='3' rows='3' className="min-w-[648px] gap-3">
        <Box className="col-span-1">
          <FormSelect
            label="Relationship"
            {...form.register('relationship')}
            buttonClassName='h-7'
            options={[
              { label: 'Father', value: 'Father' },
              { label: 'Mother', value: 'Mother' },
              { label: 'Brother', value: 'Brother' },
            ]}
          />
        </Box>
        <FormTextInput
          label="First Name"
          required
          {...form.register('firstName')}
          className={inputFieldClasses}
        />
        <FormTextInput
          label="Middle Name"
          {...form.register('middleName')}
          className={inputFieldClasses}
        />
        <FormTextInput
          label="Last Name"
          required
          {...form.register('lastName')}
          className={inputFieldClasses}
        />
        {form.watch('relationship') === 'Mother'? (
          <FormTextInput
            label="Maiden Name"
            {...form.register('maidenName')}
            className={inputFieldClasses}
          />
        ): null}
        <FormTextInput
          label="Phone Number"
          required
          {...form.register('homePhone')}
          className={inputFieldClasses}
        />
        <FormTextInput
          label="Email"
          required
          {...form.register('email')}
          className={inputFieldClasses}
        />
        <Box className={`${form.watch('relationship') === 'Mother'? 'col-span-2': 'col-span-3'}`}>
          <FormTextInput
            label="Address"
            required
            {...form.register('address1')}
            className={inputFieldClasses}
          />
        </Box>
      </Grid>
      <Flex justify="end" mt="3">
        <FormSubmitButton
          className='bg-[#151B4A] text-[#FFF] text-[14px] px-3 py-1.5'
          form={form}
        >
          Save
        </FormSubmitButton>
      </Flex>{' '}
    </FormContainer>
  )
}

export { AddRelationshipForm }
