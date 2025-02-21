import { transformIn } from '@/ui/add-on/add-on-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const AddOnDetailView = ({ data, visitType }: NoteDetailProps) => {
  if (data?.length === 0) return null
  if (data?.length === 1 && data[0].sectionName === QuickNoteSectionName.Addon)
    return null

  return <Details data={transformIn(data, [], visitType)} />
}

export { AddOnDetailView }
