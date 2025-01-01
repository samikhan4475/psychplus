import { transformIn } from '@/ui/add-on/add-on-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const AddOnDetailView = ({ data }: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { AddOnDetailView }
