import { Button, Dialog } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { formatDateTime, getTimeLabel } from '@/utils'
import { SpravatoWidgetSchemaType } from '../../../spravato-widget-schema'

const SaveButton = ({
  onSave,
  generateVitalButtons,
}: {
  onSave: () => void
  generateVitalButtons: (vitalSigns: []) => void
}) => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const onClick = () => {
    const vitalSigns: any = [...form.watch('vitalSigns')]
    const newVitalSign = { ...form.watch('newVitalSign') }

    if (Object.values(newVitalSign).includes('')) return

    vitalSigns.unshift({
      ...newVitalSign,
      vitalSignDateTime: formatDateTime(new Date().toISOString(), false),
      // timeSlot: `${timeSlot}`,
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
