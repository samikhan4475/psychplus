import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { mseWidgetSchema, type MseWidgetSchemaType } from './mse-widget-schema'

const useMseWidgetForm = () => {
  const form = useForm<MseWidgetSchemaType>({
    resolver: zodResolver(mseWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      orientation: [],
      appearance: [],
      behavior: [],
      psychomotor: [],
      speech: [],
      mood: [],
      affect: [],
      thoughtProcess: [],
      thoughtContentSi: undefined,
      thoughtContentSiActivePassive: [],
      thoughtContentHi: undefined,
      thoughtContentDelusions: undefined,
      thoughtContentHallucinations: undefined,
      thoughtContentOther: '',
      memoryRecentIntact: undefined,
      memoryRemoteIntact: undefined,
      memoryHowTested: [],
      memoryHowTestedOther: '',
    },
  })

  return form
}

export { useMseWidgetForm }
