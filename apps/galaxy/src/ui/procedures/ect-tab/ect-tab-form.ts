import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ectWidgetSchema, type EctWidgetSchemaType } from './ect-tab-schema'

const useEctWidgetForm = () => {
  const form = useForm<EctWidgetSchemaType>({
    resolver: zodResolver(ectWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      seriesMaintenance:'series',
      biteblock:'yes',
      timeout: undefined,
      timeOfProcedure: undefined,
      ectTypeBlock: undefined,
      ectSettingBlock: {
        pw: '',           
        frequency: '120',    
        duration: '8',    
        current: '800',      
      },
      ectSeizureDuration: '000',
      ectPostOpMedicationBlock: undefined,
      ectComplicationsBlock: undefined,
      ectAssessment: undefined,
      ectContinuePBlock: undefined,
    },
  })
  return form
}

export { useEctWidgetForm }
