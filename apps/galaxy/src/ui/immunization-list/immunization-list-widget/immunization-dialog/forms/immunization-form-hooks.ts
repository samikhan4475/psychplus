import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { 
  administeredSchema, 
  historicalSchema, 
  refusalSchema,
  AdministeredSchemaType,
  HistoricalSchemaType,
  RefusalSchemaType
} from './schema'

export const useAdministeredForm = (initialValue: AdministeredSchemaType) => {
  const form = useForm<AdministeredSchemaType>({
    resolver: zodResolver(administeredSchema),
    defaultValues: initialValue,
  })
  return form
}

export const useHistoricalForm = (initialValue: HistoricalSchemaType) => {
  const form = useForm<HistoricalSchemaType>({
    resolver: zodResolver(historicalSchema),
    defaultValues: initialValue,
  })
  return form
}

export const useRefusalForm = (initialValue: RefusalSchemaType) => {
  const form = useForm<RefusalSchemaType>({
    resolver: zodResolver(refusalSchema),
    defaultValues: initialValue,
  })
  return form
} 