import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  hpiWidgetSchema,
  HpiWidgetSchemaType,
} from './presenting-symptoms-schema'

const useHpiWidgetForm = (initialValue: HpiWidgetSchemaType) => {
  const form = useForm<HpiWidgetSchemaType>({
    resolver: zodResolver(hpiWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })
  return form
}

export { useHpiWidgetForm }
