import { CheckboxCell } from '@/components'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { useStore } from '../store'

const AddAllToNoteCellHeader = () => {
  const {
    data,
    handleCheckAll,
    setIsErrorAlertOpen,
    setAlertErrorMessage,
    appointment,
  } = useStore((state) => ({
    handleCheckAll: state.handleCheckAll,
    data: state.data,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    setAlertErrorMessage: state.setAlertErrorMessage,
    appointment: state.appointment,
  }))

  const { staffId } = useGlobalStore((state) => state.user)
  const isAppointmentProviderLoggedIn = appointment?.providerStaffId === staffId
  const addToNoteProviderVitalsHistoryPermission = useHasPermission(
    'addToNoteProviderVitalsHistory',
  )

  if (!data) {
    return null
  }

  const activeVitals = data.filter((item) => item.recordStatus === 'Active')
  const allChecked =
    activeVitals.length > 0
      ? activeVitals.every((item) => item.addToNote)
      : false

  const onChange = (checked: boolean) => {
    if (
      !isAppointmentProviderLoggedIn ||
      !addToNoteProviderVitalsHistoryPermission
    ) {
      setIsErrorAlertOpen(true)
      setAlertErrorMessage(
        'You do not have permission to check/uncheck the "Add to Note" checkbox. Please contact your supervisor if you need any further assistance.',
      )

      return
    }

    handleCheckAll(checked)
  }

  return (
    <CheckboxCell
      label="Add to Note"
      className="whitespace-nowrap font-[500]"
      checked={allChecked}
      disabled={activeVitals.length === 0}
      onCheckedChange={onChange}
    />
  )
}

export { AddAllToNoteCellHeader }
