import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import { transformOut } from '@/ui/vitals/data'
import { useStore } from '../../store'
import { PatientVital } from '../../types'

const SaveToNoteButton = ({
  patientId,
  appointmentId,
}: {
  patientId: string
  appointmentId: string
}) => {
  const [loading, setLoading] = useState(false)

  const { data, setQuicknotesData } = useStore((state) => ({
    data: state.data,
    setQuicknotesData: state.setQuicknotesData,
  }))

  const handleSave = async () => {
    setLoading(true)
    const selectedVitalIds = data
      ?.filter((item) => item.addToNote)
      .map((item) => String(item.id))

    const payload = transformOut(
      patientId,
      appointmentId,
    )({
      vitalsId: selectedVitalIds as string[],
    })

    const result = await saveWidgetAction({
      patientId,
      data: payload,
    })

    if (result.state === 'error') {
      toast.error('Failed to save!')
      setLoading(false)

      return
    }

    toast.success('Saved!')

    setQuicknotesData(data?.filter((item) => item.addToNote) as PatientVital[])
    setLoading(false)
  }
  return (
    <Button
      type="button"
      onClick={handleSave}
      variant="outline"
      size="1"
      color="gray"
      className="text-black mr-2.5"
      disabled={loading}
    >
      Save
    </Button>
  )
}

export { SaveToNoteButton }
