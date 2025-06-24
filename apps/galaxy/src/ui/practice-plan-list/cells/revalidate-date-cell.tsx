import React from 'react'
import { PropsWithRow, TextCell } from '@/components'
import { formatDate } from '@/utils'
import { InsurancePlanItem } from '../types'

const RevalidateDateCell = ({ row }: PropsWithRow<InsurancePlanItem>) => {
  const { revalidationDate } = row.original
  if (!revalidationDate) return null

  const revalTime = new Date(revalidationDate).getTime()
  const now = Date.now()

  const daysInMilliseconds = 24 * 60 * 60 * 1000
  const is90DaysPast = revalTime < now - 90 * daysInMilliseconds
  const is30To90DaysPast =
    revalTime < now - 30 * daysInMilliseconds && !is90DaysPast

  let conditionClass = ''
  if (is90DaysPast) {
    conditionClass = 'bg-yellow-5'
  } else if (is30To90DaysPast) {
    conditionClass = 'bg-red-5'
  }
  return (
    <TextCell wrapperClass={`h-full w-full vertical-center ${conditionClass}`}>
      {formatDate(revalidationDate, 'MM/dd/yyyy')}
    </TextCell>
  )
}

export { RevalidateDateCell }
