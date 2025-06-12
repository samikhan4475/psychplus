import { CalendarDate } from '@internationalized/date'
import { TextCell } from '@/components'
import { PreferredPartnerUser } from '@/types'
import { cn, formatDate, getCalendarDate, getOptionalDateString } from '@/utils'
import { usePreferredPartnerStore } from '../store'
import { SimpleDatePicker } from './simple-date-picker'

interface DateCellProps {
  original: PreferredPartnerUser
  editMode: string | null
  dateField: 'addDate' | 'termDate'
}

export const DateCell = ({ original, editMode, dateField }: DateCellProps) => {
  const isDeleted = (user: PreferredPartnerUser) =>
    user.recordStatus === 'Deleted'
  const { getTempUserData, updateTempData } = usePreferredPartnerStore(
    (state) => ({
      getTempUserData: state.getTempUserData,
      updateTempData: state.updateTempData,
    }),
  )

  const currentUserData =
    editMode === original.id ? getTempUserData(original.id) : original
  const currentValue = currentUserData?.[dateField] ?? original[dateField]

  const calendarValue = currentValue ? getCalendarDate(currentValue) : null

  const startDateValue = currentUserData?.addDate ?? original.addDate
  const startDate = startDateValue ? getCalendarDate(startDateValue) : null

  const validateTermDate = (date: CalendarDate | null): boolean => {
    if (dateField !== 'termDate' || !date || !startDate) {
      return true
    }
    return date.compare(startDate) >= 0
  }

  return editMode === original.id ? (
    <SimpleDatePicker
      dateInputClass="h-6 w-[80px]"
      className="flex flex-row items-center gap-2"
      value={calendarValue}
      minValue={dateField === 'termDate' ? startDate ?? undefined : undefined}
      handleChange={(date) => {
        if (!validateTermDate(date)) {
          return
        }
        const dateString = getOptionalDateString(date)
        updateTempData(original.id, dateField, dateString ?? '')
      }}
    />
  ) : (
    <TextCell
      className={cn('truncate', isDeleted(original) && 'text-gray-400')}
    >
      {original?.[dateField]
        ? formatDate(original[dateField], 'MM/dd/yy')
        : '-'}
    </TextCell>
  )
}
