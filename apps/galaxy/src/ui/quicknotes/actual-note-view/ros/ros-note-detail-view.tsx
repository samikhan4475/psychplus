'use client'

import { transformIn } from '@/ui/ros/ros-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const ReviewofSystemNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { ReviewofSystemNoteDetailView }
