import { useSearchParams } from 'next/navigation'
import { Button, Dialog } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { formatDateTime, getTimeLabel } from '@/utils'
import { SpravatoWidgetSchemaType } from '../../../spravato-widget-schema'

interface SaveButtonProps {
  onSave: () => void
  generateVitalButtons: (vitalSigns: []) => void
  timeSlot: number
}

const SaveButton = ({
  onSave,
  generateVitalButtons,
  timeSlot,
}: SaveButtonProps) => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const isOkToProceed = form.watch('isOkToProceed') ?? 'false'

  const appId = Number(useSearchParams().get('id'))

  const onClick = () => {
    const vitalSigns: any = [...form.watch('vitalSigns')]
    const newVitalSign = { ...form.watch('newVitalSign') }

    if (Object.values(newVitalSign).includes('')) return

    vitalSigns.unshift({
      ...newVitalSign,
      vitalSignDateTime: formatDateTime(new Date().toISOString(), false),
      appId,
      isOkToProceed:
        isOkToProceed === 'true' && timeSlot === 0 ? 'true' : 'false',
      timeSlot: `${timeSlot}`,
    })
    if (vitalSigns.length === 1) {
      form.setValue(
        'spravatoAdministrationTime',
        getTimeLabel(new Date().toISOString(), false),
      )
    }

    form.setValue('vitalSigns', vitalSigns)
    form.setValue('newVitalSign', {
      diastolic: '',
      heartRate: '',
      pulseOximetry: '',
      respiratoryRate: '',
      systolic: '',
    })
    generateVitalButtons(vitalSigns)
    onSave()
  }

  return (
    <Dialog.Trigger>
      <Button highContrast size="1" type="button" onClick={onClick}>
        Save
      </Button>
    </Dialog.Trigger>
  )
}

export { SaveButton }
