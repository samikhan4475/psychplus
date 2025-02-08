import { transformIn } from '@/ui/add-on/add-on-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'
import { QuickNoteSectionName } from '../../constants'

const AddOnDetailView = ({ data }: NoteDetailProps) => {
  if (data?.length === 0) return null
  if (data?.length === 1 && data[0].sectionName === QuickNoteSectionName.Addon) return null;

  return <Details data={transformIn(data)} />
}

export { AddOnDetailView }
