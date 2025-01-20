import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { transformOut } from '@/ui/vitals/data'
import { useStore } from '../../store'
import { PatientVital } from '../../types'

const SaveToNoteButton = ({ patientId }: { patientId: string }) => {
  const { updateWidgetsData } = useQuickNoteUpdate()
  const [loading, setLoading] = useState(false)

  const {
    data,
    setQuicknotesData,
    setIsErrorAlertOpen,
    setAlertErrorMessage,
    appointment,
  } = useStore((state) => ({
    data: state.data,
    setQuicknotesData: state.setQuicknotesData,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    setAlertErrorMessage: state.setAlertErrorMessage,
    appointment: state.appointment,
  }))

  const addToNoteProviderVitalsHistoryPermission = useHasPermission(
    'addToNoteProviderVitalsHistory',
  )
  const { staffId } = useGlobalStore((state) => state.user)
  const isAppointmentProviderLoggedIn = appointment?.providerStaffId === staffId

  const handleSave = async () => {
    if (
      !isAppointmentProviderLoggedIn ||
      !addToNoteProviderVitalsHistoryPermission
    ) {
      setIsErrorAlertOpen(true)
      setAlertErrorMessage(
        'You do not have permission to to click on “Save” button to Add/Remove vitals from note. Please contact your supervisor if you need any further assistance.',
      )

      return
    }

    setLoading(true)
    const selectedVitalIds = data
      ?.filter((item) => item.addToNote)
      ?.map((item) => String(item.id))

    if (!selectedVitalIds?.length) {
      selectedVitalIds?.push('0')
    }

    const payload = transformOut(patientId)({
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
    updateWidgetsData(payload)

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
