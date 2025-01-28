'use client'

import { useState } from 'react'
import { Checkbox } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { revalidateAction } from '@/actions/revalidate'
import { PropsWithRow } from '@/components'
import { StaffComment } from '@/types'
import { updateStaffCommentAction } from '../../actions'

const UrgentCell = ({
  row: {
    original: { isUrgentComment, id, recordStatus, comment },
  },
}: PropsWithRow<StaffComment>) => {
  const [isChecked, setIsChecked] = useState(isUrgentComment)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = async (checked: boolean) => {
    setIsChecked(checked)
    setIsLoading(true)

    const result = await updateStaffCommentAction({
      commentId: id,
      isUrgentComment: checked,
      comment: comment,
    })

    if (result.state === 'error') {
      toast.error(result.error)
      setIsChecked(!checked)
      setIsLoading(false)
      return
    }

    if (checked) {
      toast.success('Comment marked urgent successfully')
    } else {
      toast.success('Comment unmarked urgent successfully')
    }
    revalidateAction()

    setIsLoading(false)
  }
  return (
    <Checkbox
      defaultChecked={isUrgentComment}
      checked={isChecked}
      size="1"
      disabled={isLoading || recordStatus === 'Deleted'}
      onCheckedChange={handleChange}
      className="data-[state=checked]:before:bg-pp-text-primary-base data-[disabled]:before:!bg-pp-gray-2"
      highContrast
    />
  )
}

export { UrgentCell }
