'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getPatientStaffCommentsAction } from '@/actions'
import { LoadingPlaceholder } from '@/components'
import { STAFF_COMMENT_STATUS, StaffComment } from '@/types'
import { StaffCommentParams } from '@/ui/visit/types'
import { TreatmentCommentForm } from './treatment-comment-form'
import { TreatmentTable } from './treatment-table'

const TreatmentTab = ({ appointmentId }: { appointmentId: number }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [comments, setComments] = useState<StaffComment[]>([])

  useEffect(() => {
    fetchStaffComments({
      isTreatment: true,
      isBilling: false,
      appointmentId: appointmentId,
      recordStatuses: [STAFF_COMMENT_STATUS.Active],
    })
  }, [appointmentId])

  const fetchStaffComments = async (payload: StaffCommentParams) => {
    setLoading(true)

    const result = await getPatientStaffCommentsAction(payload)

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Staff Comments')
      return setLoading(false)
    }
    setComments(result?.data?.comments)
    setLoading(false)
  }

  return (
    <Flex direction="column" gap="2" width="100%" py="2">
      <TreatmentCommentForm
        appointmentId={appointmentId}
        fetchStaffComments={fetchStaffComments}
      />
      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-[80px] rounded-1 border border-gray-5" />
      ) : (
        <TreatmentTable data={comments} fetchStaffComments={fetchStaffComments} />
      )}
    </Flex>
  )
}

export { TreatmentTab }
