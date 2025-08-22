import { getQuicknoteSections } from '@/api'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesView } from './questionnaires-view'

interface QuestionnairesVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const sections = [
  QuickNoteSectionName.QuickNoteSectionDashboard,
  QuickNoteSectionName.QuickNoteSectionPhq9,
  QuickNoteSectionName.QuickNoteSectionGad7,
  QuickNoteSectionName.QuickNoteSectionSnapIV,
  QuickNoteSectionName.QuickNoteSectionDast10,
  QuickNoteSectionName.QuickNoteSectionAudit,
  QuickNoteSectionName.QuickNoteSectionHamD,
  QuickNoteSectionName.QuickNoteSectionYbcos,
  QuickNoteSectionName.QuickNoteSectionMoca,
  QuickNoteSectionName.QuickNoteSectionAims,
  QuickNoteSectionName.QuickNoteSectionPcl5,
  QuickNoteSectionName.QuickNoteSectionCssrs,
  QuickNoteSectionName.QuickNoteSectionPsc17,
  QuickNoteSectionName.QuickNoteSectionMdq,
  QuickNoteSectionName.QuickNoteSectionCars2St,
  QuickNoteSectionName.QuickNoteSectionCopsR,
  QuickNoteSectionName.QuickNoteSectionAdultAsrs,
  QuickNoteSectionName.QuickNoteSectionVadprs,
  QuickNoteSectionName.QuickNoteSectionGqasc,
  QuickNoteSectionName.QuickNoteSectionDesii,
  QuickNoteSectionName.QuickNoteSectionBai,
  QuickNoteSectionName.QuickNoteSectionBdi,
]

const QuestionnairesLoader = async ({
  params,
}: QuestionnairesVisitViewPageProps) => {
  const response = await getQuicknoteSections({
    patientId: Number(params.id),
    sectionName: sections,
  })

  if (response.state === 'error') {
    return <div>fail Questionnaires: {response.error}</div>
  }

  return <QuestionnairesView patientId={params.id} data={response.data} />
}

export { QuestionnairesLoader }
