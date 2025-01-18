import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { schema, SchemaType } from './schema'

const ForwardingMessageForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      to: [],
      startingDate: '',
      endingDate: '',
      days: '',
      taskPermissions: [],
    },
  })
  const handleSubmit = () => {}

  return <FormContainer form={form} onSubmit={handleSubmit}></FormContainer>
}

export { ForwardingMessageForm }
