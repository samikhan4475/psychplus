import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TherapySchema, TherapySchemaType } from './therapy-schema'

const useTherapyForm = () => {
  const form = useForm<TherapySchemaType>({
    resolver: zodResolver(TherapySchema),
    reValidateMode: 'onChange',
    defaultValues: {
      therapyTimeSpent:undefined,
      therapySessionParticipants:undefined,
      therapyDetailsInterventions:[],
      therapyDetailsModality:[],
      additionalTherapyDetail:undefined
    },
  })

  return form
}

export { useTherapyForm }
