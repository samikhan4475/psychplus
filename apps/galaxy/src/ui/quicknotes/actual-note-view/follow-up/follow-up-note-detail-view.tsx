'use client'

import { NoteDetailProps } from '../types'
import { Details } from './details'

const FollowUpNoteDetailView = ({
  appointments,
  appointment,
}: NoteDetailProps) => {

  return (
    <Details
      data={appointments || []}
      isFollowupDenied={appointment?.isFollowupDenied ?? false}
      followupDenialReason={appointment?.followUpDenialReason ?? ''}
    />
  )
}

export { FollowUpNoteDetailView }
