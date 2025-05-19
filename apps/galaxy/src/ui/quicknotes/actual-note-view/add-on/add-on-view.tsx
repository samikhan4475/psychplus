import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/add-on/add-on-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type AddOnProps = {
  patientId: string
  visitType: string
}

const AddOnView = async ({ patientId }: AddOnProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.Addon,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const addOnSections = response.data ?? []

  const data = transformIn(addOnSections, undefined)

  return (
    <ActualNoteDetailsWrapper sectionName={QuickNoteSectionName.Addon}>
      <Details data={data} />
    </ActualNoteDetailsWrapper>
  )
}

export { AddOnView }
