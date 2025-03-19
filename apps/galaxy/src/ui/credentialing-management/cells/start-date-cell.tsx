import { PropsWithRow, TextCell } from '@/components'
import { cn, getSlashedPaddedDateString } from '@/utils'
import { License } from '../types'

const StartDateCell = ({ row }: PropsWithRow<License>) => {
  const { startDate } = row.original

  return (
    <TextCell className={'h-full w-full flex-1 content-center pl-1'}>
      {getSlashedPaddedDateString(startDate?.toString())}
    </TextCell>
  )
}

export { StartDateCell }
